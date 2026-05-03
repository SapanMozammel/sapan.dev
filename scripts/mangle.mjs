#!/usr/bin/env node
/**
 * Post-build Tailwind class mangler for sapan.
 *
 * Walks .next/ output and rewrites Tailwind class names to short tw-X tokens.
 * Bundler-agnostic — operates on emitted artifacts (works on Turbopack builds).
 *
 * Pipeline:
 *   1. Discover Tailwind CSS chunks (those containing @layer).
 *   2. Extract candidate class selectors from those CSS files.
 *   3. Extract statically-used tokens from HTML class="…" attrs and JS / RSC
 *      className:"…" / "className":"…" string literals.
 *   4. Mapping = (CSS ∩ static-use) − reserve-list (next-themes etc).
 *   5. Rewrite CSS selectors and HTML / JS / RSC className strings in place.
 *
 * Mapping output: .tw-patch/class-list.json (gitignored).
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const NEXT_DIR = '.next';
const OUT_DIR = '.tw-patch';
const OUT_FILE = join(OUT_DIR, 'class-list.json');
const PREFIX = 'tw-';

// Classes added at runtime via classList.* must keep their original names so
// the runtime call still matches the CSS rules. Seed with next-themes' default
// strategy classes; the rest are auto-detected by scanning JS chunks for
// classList.{add,remove,toggle,replace}("X") patterns.
const RESERVE = new Set(['dark', 'light']);
const CLASSLIST_RE = /classList\.(?:add|remove|toggle|replace)\(\s*["']([^"']+)["']/g;

const walk = (dir, predicate) => {
	const out = [];
	const stack = [dir];
	while (stack.length) {
		const current = stack.pop();
		let entries;
		try {
			entries = readdirSync(current, { withFileTypes: true });
		} catch {
			continue;
		}
		for (const entry of entries) {
			const full = join(current, entry.name);
			if (entry.isDirectory()) stack.push(full);
			else if (entry.isFile() && predicate(full)) out.push(full);
		}
	}
	return out;
};

// CSS escape unwinder: `\:` → `:`, `\.` → `.`, `\[` → `[`, etc.
const unescapeCssClass = (raw) => raw.replace(/\\(.)/g, '$1');

// CSS class identifier: starts with letter/underscore/hyphen or an escape
// sequence; continues with word chars, hyphens, or further escape sequences.
// Unescaped `:`, `(`, `[`, `.` etc. terminate the class — they are selector
// syntax (pseudo-class, attribute, descendant) when not preceded by `\`.
const CSS_CLASS_RE = /\.((?:[a-zA-Z_\-]|\\.)(?:[\w\-]|\\.)*)/g;
const TAILWIND_MARKER = /@layer\s+[a-z]/;

const extractClassesFromCss = (text) => {
	const found = new Set();
	for (const match of text.matchAll(CSS_CLASS_RE)) {
		const raw = match[1];
		// Strip a trailing `\` if regex over-captured (escape sequence at end).
		const cleaned = raw.replace(/\\$/, '');
		if (!cleaned) continue;
		found.add(unescapeCssClass(cleaned));
	}
	return found;
};

// Static className contexts. Capture the inside-quote payload, split on
// whitespace. Decoding handles JS escape sequences inside JSON / RSC payloads.
const CLASS_CONTEXT_PATTERNS = [
	/\bclass\s*=\s*"([^"]+)"/g,
	/\bclass\s*=\s*'([^']+)'/g,
	/\bclassName\s*:\s*"((?:[^"\\]|\\.)*)"/g,
	/"className"\s*:\s*"((?:[^"\\]|\\.)*)"/g,
];

const decodeJsString = (raw) =>
	raw
		.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
		.replace(/\\(.)/g, '$1');

const extractStaticTokens = (text) => {
	const found = new Set();
	for (const re of CLASS_CONTEXT_PATTERNS) {
		for (const match of text.matchAll(re)) {
			const decoded = decodeJsString(match[1]);
			for (const token of decoded.split(/\s+/)) {
				if (token) found.add(token);
			}
		}
	}
	return found;
};

// In minified bundles `cn()` calls appear as `(0,r.cn)(…)` etc. — the strings
// passed in are className args but never appear in a `className:"…"` context.
// We catch them by scanning every string literal and adding tokens that are
// already known Tailwind classes (the intersection-with-css filter keeps this
// safe — non-className strings whose tokens never appear in CSS contribute
// nothing).
const JS_STRING_LITERAL_RE = /"((?:[^"\\]|\\.)*)"/g;

const TEMPLATE_LITERAL_RE = /`((?:[^`\\$]|\\.|\$(?!\{))*(?:\$\{[^}]*\}(?:[^`\\$]|\\.|\$(?!\{))*)*)`/g;

const extractTokensFromJsStringLiterals = (text, cssClasses) => {
	const found = new Set();
	for (const match of text.matchAll(JS_STRING_LITERAL_RE)) {
		const decoded = decodeJsString(match[1]);
		for (const token of decoded.split(/\s+/)) {
			if (token && cssClasses.has(token)) found.add(token);
		}
	}
	for (const match of text.matchAll(TEMPLATE_LITERAL_RE)) {
		const body = match[1];
		for (const part of body.split(/\$\{[^}]*\}/)) {
			for (const token of part.split(/\s+/)) {
				if (token && cssClasses.has(token)) found.add(token);
			}
		}
	}
	return found;
};

const generateMangledName = (index) => {
	let name = '';
	let n = index;
	do {
		name = String.fromCharCode(97 + (n % 26)) + name;
		n = Math.floor(n / 26) - 1;
	} while (n >= 0);
	return PREFIX + name;
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Re-escape a class name back into its CSS selector form. Tailwind escapes
// any non-[\w\-] character with a leading backslash.
const escapeForCssSelector = (s) => s.replace(/[^\w\-]/g, (c) => `\\${c}`);

// ---------- Pass 1: discover ----------

const cssFiles = walk(NEXT_DIR, (f) => f.endsWith('.css'));
const htmlFiles = walk(NEXT_DIR, (f) => f.endsWith('.html'));
const jsFiles = walk(NEXT_DIR, (f) => f.endsWith('.js') && !f.endsWith('.js.map'));
const rscFiles = walk(NEXT_DIR, (f) => f.endsWith('.rsc'));

const tailwindCssFiles = cssFiles.filter((f) => TAILWIND_MARKER.test(readFileSync(f, 'utf8')));

console.log(`[mangle] css total ${cssFiles.length} (tailwind ${tailwindCssFiles.length}), html ${htmlFiles.length}, js ${jsFiles.length}, rsc ${rscFiles.length}`);

const cssClassSet = new Set();
for (const file of tailwindCssFiles) {
	for (const cls of extractClassesFromCss(readFileSync(file, 'utf8'))) cssClassSet.add(cls);
}

const staticTokenSet = new Set();
for (const file of [...htmlFiles, ...jsFiles, ...rscFiles]) {
	for (const tok of extractStaticTokens(readFileSync(file, 'utf8'))) staticTokenSet.add(tok);
}

for (const file of [...jsFiles, ...rscFiles]) {
	const text = readFileSync(file, 'utf8');
	for (const tok of extractTokensFromJsStringLiterals(text, cssClassSet)) staticTokenSet.add(tok);
}

for (const file of jsFiles) {
	const text = readFileSync(file, 'utf8');
	for (const match of text.matchAll(CLASSLIST_RE)) RESERVE.add(match[1]);
}

const mangleable = [...cssClassSet]
	.filter((cls) => staticTokenSet.has(cls))
	.filter((cls) => !RESERVE.has(cls))
	.sort();

const mapping = {};
mangleable.forEach((original, index) => {
	mapping[original] = generateMangledName(index);
});

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(mapping, null, 2));

console.log(`[mangle] css classes: ${cssClassSet.size}`);
console.log(`[mangle] static tokens: ${staticTokenSet.size}`);
console.log(`[mangle] mangleable: ${mangleable.length}`);
console.log(`[mangle] reserved: ${[...RESERVE].join(', ')}`);
console.log(`[mangle] mapping → ${OUT_FILE}`);

const sample = mangleable.slice(0, 5).map((k) => `  ${k} → ${mapping[k]}`);
console.log(`[mangle] sample:\n${sample.join('\n')}`);

// ---------- Pass 2: rewrite ----------

// Replace longer originals first so `dark:bg-slate-900` matches before any
// shorter prefix like `dark` (when mangled separately).
const replacementOrder = [...mangleable].sort((a, b) => b.length - a.length);

const rewriteHtmlClassAttrs = (text) => {
	const map = (payload) => {
		const tokens = payload.split(/(\s+)/);
		return tokens.map((t) => mapping[t] ?? t).join('');
	};
	return text
		.replace(/\bclass\s*=\s*"([^"]+)"/g, (_m, p) => `class="${map(p)}"`)
		.replace(/\bclass\s*=\s*'([^']+)'/g, (_m, p) => `class='${map(p)}'`);
};

const mapPayloadAsClassString = (payload) => {
	const decoded = decodeJsString(payload);
	const tokens = decoded.split(/(\s+)/);
	return tokens.map((t) => mapping[t] ?? t).join('');
};

// Walk a string literal starting at `text[start]` (an opening quote). Returns
// `{ end, payload }` where `end` is the index of the closing quote.
const readStringLiteral = (text, start) => {
	const quote = text[start];
	let i = start + 1;
	while (i < text.length) {
		if (text[i] === '\\') {
			i += 2;
			continue;
		}
		if (text[i] === quote) return { end: i, payload: text.slice(start + 1, i) };
		i++;
	}
	return { end: text.length, payload: text.slice(start + 1) };
};

// Rewrite every `"…"` string literal inside `cn(…)` (or `(0,X.cn)(…)`)
// argument lists. All tokens inside such literals — including single tokens
// like "block" or "hidden" — are mangled, since within cn() we know the
// strings are class names.
const CN_OPEN_RE = /(?:\(\s*0\s*,\s*[a-zA-Z_$][\w$]*\s*\.\s*cn\s*\)|(?:^|[^a-zA-Z_$0-9])[a-zA-Z_$][\w$]*\s*\.\s*cn|(?:^|[^a-zA-Z_$0-9])cn)\s*\(/g;

const rewriteWithinCnCalls = (text) => {
	let out = '';
	let cursor = 0;
	let match;
	CN_OPEN_RE.lastIndex = 0;
	while ((match = CN_OPEN_RE.exec(text)) !== null) {
		out += text.slice(cursor, match.index + match[0].length);
		let i = match.index + match[0].length;
		let depth = 1;
		while (i < text.length && depth > 0) {
			const c = text[i];
			if (c === '(') {
				depth++;
				out += c;
				i++;
			} else if (c === ')') {
				depth--;
				out += c;
				i++;
				if (depth === 0) break;
			} else if (c === '"' || c === "'") {
				const { end, payload } = readStringLiteral(text, i);
				const decoded = decodeJsString(payload);
				const parts = decoded.split(/(\s+)/);
				// Inside a cn() span we know the string is a class string. Map
				// every mapped token individually; leave unmapped tokens alone
				// (Tailwind v4 marker classes like `group/tab` have no CSS rule
				// and stay un-mangled — they still match because the CSS isn't
				// rewriting them either).
				const mapped = parts.map((p) => mapping[p] ?? p).join('');
				out += c + mapped + c;
				i = end + 1;
			} else if (c === '`') {
				// Template literal — preserve as-is (interpolation is dynamic anyway).
				let j = i + 1;
				while (j < text.length) {
					if (text[j] === '\\') {
						j += 2;
						continue;
					}
					if (text[j] === '`') break;
					j++;
				}
				out += text.slice(i, j + 1);
				i = j + 1;
			} else {
				out += c;
				i++;
			}
		}
		cursor = i;
		CN_OPEN_RE.lastIndex = cursor;
	}
	out += text.slice(cursor);
	return out;
};

// Multi-token strict heuristic for string literals OUTSIDE cn() spans —
// catches cva() first-arg strings (the bundler renames cva but the multi-token
// pattern survives). Single-token strings are NOT rewritten here, since they
// could be inline-style values like "absolute", "flex", "block", etc.
const rewriteMultiTokenClassStrings = (text) =>
	text.replace(/"((?:[^"\\]|\\.)*)"/g, (match, payload) => {
		const decoded = decodeJsString(payload);
		const tokens = decoded.split(/\s+/).filter(Boolean);
		if (tokens.length < 2) return match;
		if (!tokens.every((t) => mapping[t] !== undefined || RESERVE.has(t))) return match;
		return `"${tokens.map((t) => mapping[t] ?? t).join(' ')}"`;
	});

// Same strict heuristic for template literals — covers config patterns like
// `` `absolute inset-y-0 ${x}` `` used by sapan's Button variants config. The
// static parts must collectively contain ≥2 tokens, all of which are mapped
// or reserved, before we touch the template.
const rewriteTemplateLiteralClassStrings = (text) =>
	text.replace(/`((?:[^`\\$]|\\.|\$(?!\{))*(?:\$\{[^}]*\}(?:[^`\\$]|\\.|\$(?!\{))*)*)`/g, (match, body) => {
		const parts = body.split(/(\$\{[^}]*\})/);
		const allStaticTokens = [];
		for (const part of parts) {
			if (part.startsWith('${')) continue;
			for (const tok of part.split(/\s+/)) if (tok) allStaticTokens.push(tok);
		}
		if (allStaticTokens.length < 2) return match;
		if (!allStaticTokens.every((t) => mapping[t] !== undefined || RESERVE.has(t))) return match;
		const newBody = parts
			.map((part) => {
				if (part.startsWith('${')) return part;
				return part
					.split(/(\s+)/)
					.map((p) => mapping[p] ?? p)
					.join('');
			})
			.join('');
		return '`' + newBody + '`';
	});

const rewriteJsClassNames = (text) => {
	let out = text
		.replace(/(\bclassName\s*:\s*")((?:[^"\\]|\\.)*)(")/g, (_m, p1, payload, p3) => p1 + mapPayloadAsClassString(payload) + p3)
		.replace(/("className"\s*:\s*")((?:[^"\\]|\\.)*)(")/g, (_m, p1, payload, p3) => p1 + mapPayloadAsClassString(payload) + p3);
	out = rewriteWithinCnCalls(out);
	out = rewriteMultiTokenClassStrings(out);
	out = rewriteTemplateLiteralClassStrings(out);
	return out;
};

const rewriteCss = (text) => {
	let out = text;
	for (const original of replacementOrder) {
		const escaped = escapeForCssSelector(original);
		// Match `.{escaped}` not followed by another class-continuation char
		// (word, hyphen, or backslash starting a further escape sequence).
		const re = new RegExp(`\\.${escapeRegex(escaped)}(?![\\w\\-\\\\])`, 'g');
		out = out.replace(re, `.${mapping[original]}`);
	}
	return out;
};

let bytesBefore = 0;
let bytesAfter = 0;
let filesRewritten = 0;

const rewriteFile = (file, transform) => {
	const before = readFileSync(file, 'utf8');
	const after = transform(before);
	bytesBefore += before.length;
	bytesAfter += after.length;
	if (before !== after) {
		writeFileSync(file, after);
		filesRewritten += 1;
	}
};

for (const file of tailwindCssFiles) rewriteFile(file, rewriteCss);
for (const file of htmlFiles) rewriteFile(file, (t) => rewriteHtmlClassAttrs(rewriteJsClassNames(t)));
for (const file of [...jsFiles, ...rscFiles]) rewriteFile(file, rewriteJsClassNames);

const saved = bytesBefore - bytesAfter;
const pct = bytesBefore > 0 ? ((saved / bytesBefore) * 100).toFixed(2) : '0.00';
console.log(`[mangle] rewrote ${filesRewritten} files`);
console.log(`[mangle] bytes before: ${bytesBefore.toLocaleString()}`);
console.log(`[mangle] bytes after:  ${bytesAfter.toLocaleString()}`);
console.log(`[mangle] saved:        ${saved.toLocaleString()} (${pct}%)`);
