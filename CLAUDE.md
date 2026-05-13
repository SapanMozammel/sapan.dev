# CLAUDE.md

Guidance for Claude Code when working in this repository.

---

## Commands

```bash
# Run after every change
pnpm run type:check    # TypeScript (tsc --noEmit)
pnpm run lint:fix      # Auto-fix ESLint
pnpm run format:all    # Organize imports + Prettier + ESLint fix

# Test & build
pnpm run test          # Vitest (run once)
pnpm run build         # Production build
pnpm gql:codegen       # Regenerate GraphQL types — run after editing any .graphql file

# Run before push
pnpm run test:e2e      # Playwright e2e (defaults to all 8 projects)
pnpm run test:e2e:ui   # Playwright UI mode (interactive)
pnpm run build:mangled # Optional — verifies prod class mangling locally before Vercel deploy
```

> Full script reference → `docs/DEVELOPMENT_GUIDE.md`

---

## Stack

Next.js 16 · React 19 · TypeScript 6 · Tailwind CSS v4 · SCSS · Redux Toolkit · next-intl · next-themes · Framer Motion · GSAP · Three.js / R3F · shadcn/ui (new-york, Tabler icons) · Apollo Client 4.x (via `@apollo/client-integration-nextjs`, foundation only — see [.claude/skills/architecture/data-graphql.md](.claude/skills/architecture/data-graphql.md))

**Testing:** Vitest + RTL for unit/component (in `tests/`); Playwright + axe-core for e2e (in `e2e/` on dedicated port `8001`). E2e conventions live at [.claude/skills/workflow/e2e.md](.claude/skills/workflow/e2e.md) — 8-project matrix (chromium/firefox/webkit desktop + iPhone 15 + Pixel 7 + i18n-rtl + dark-mode + motion-on), reduced-motion default, mock-everything-external rule.

---

## Project Structure

```
src/
├── app/[locale]/  # App Router routes (16 locales)
├── components/    # layout/, ui/, icons/
├── data/          # content/ + config/
├── i18n/          # next-intl
├── store/         # Redux Toolkit (2 slices: locale-slice, ui-slice)
├── hooks/, lib/, styles/, types/, providers/, emails/
tests/             # Vitest unit + component (33 files)
e2e/               # Playwright (8 specs, 8-project matrix, port 8001)
public/            # Static assets
scripts/           # mangle.mjs (post-build Tailwind class mangler)
.formatter/        # Single source for ESLint+Prettier+EditorConfig
```

Full tree → [docs/DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md). All file and folder names are kebab-case (see Code Conventions below).

---

## Server vs Client Components

Server Component by default; `'use client'` only when hooks, events, refs, or browser APIs are needed. Client Component → `memo()` + `ComponentName.displayName`. Server CAN import Client; Client CANNOT import Server.

→ [.claude/skills/architecture/component-patterns.md](.claude/skills/architecture/component-patterns.md) for the full decision tree, templates, and pre-write checklist.

---

## Styling

Tailwind CSS v4 (config in CSS `@theme`, no `tailwind.config.js`) + SCSS partials in `src/styles/`. Dark mode via `.dark` class strategy (`next-themes`). Never build Tailwind class names dynamically — strings must be static (per `cn()` mandate; required for production class mangling).

- **Design tokens** (`--color-primary` light / `--color-success` dark / `--color-info` / `--color-danger`) → [.claude/skills/design-system/colors.md](.claude/skills/design-system/colors.md) for full token list + dark-mode pair guidance.
- **Fonts** (`font-dm` / `font-hg` / `font-cg` / `font-bungee` (logo-only) / `font-arabic` (RTL)) → [.claude/skills/design-system/typography.md](.claude/skills/design-system/typography.md) for the full registry, weights, and UI-element-to-font mapping.
- **Animation durations + library selection** (CSS for hover, Framer Motion for entrances, GSAP for scroll, Three.js/R3F for 3D) + **CSS keyframe utility classes** (`animate-noise`, `animate-spin-slow`, `animate-faq-border-shift`, `animate-overlay-{in,out}`, `animate-slide-{in-from,out-to}-{direction}`) → [.claude/skills/architecture/component-patterns.md](.claude/skills/architecture/component-patterns.md#animation-library-selection).

---

## State & i18n

**Redux** (`src/store/`): `localeSlice` (locale + RTL, persists to localStorage) · `uiSlice` (contact modal)
Always use `useAppDispatch()` / `useAppSelector()` — never raw Redux hooks.
**Theme**: `next-themes` — not Redux.

**i18n** (next-intl): 16 locales — `en` (default, no URL prefix), `fr`, `de`, `es`, `ar`, `zh-CN`, `pt-BR`, `ja`, `nl`, `it`, `ru`, `hi`, `no`, `tr`, `ko`, `bn`
Translation files: `src/i18n/locales/[locale]/[namespace].json` (4 namespaces: common, navigation, home, blog)
Internal routes: `import { Link } from '@/i18n/navigation'` — external links (`https://`, `mailto:`, `tel:`): `import NextLink from 'next/link'`
Arabic (`ar`): `dir="rtl"`, use `rtl:` Tailwind variant

---

## Image Handling

```ts
import { getBlurDataURL } from '@/lib/utils/image'
// <Image placeholder="blur" blurDataURL={getBlurDataURL()} />
```

Allowed remote domains: `images.unsplash.com`

---

## Code Conventions

- Arrow functions only — never `function Foo() {}`
- **kebab-case for all file and folder names** (`hero-background.tsx`, `cta-logo.tsx`, `layout/header/`, `icons/projects/notification-x/logo.tsx`); React component identifiers (the exported symbol) stay PascalCase. Locale folders (`pt-BR`, `zh-CN`) follow BCP-47 and are exempt.
- `type` only — never `interface` for props or any TypeScript definitions
- `cn()` from `@/lib/utils` for all className composition — never template literals (`` className={`...${x}`} ``), never string concatenation, never ternary with two string branches outside `cn()`. Required for prod class mangling (`pnpm build:mangled`, Vercel default via `vercel.json`); see [.claude/skills/workflow/tailwind-mangle.md](.claude/skills/workflow/tailwind-mangle.md)
- Design system tokens only — no hardcoded colors or hex values
- `@/` alias for all internal imports
- Env vars: read only via `@/lib/env` (public, `NEXT_PUBLIC_*`) or `@/lib/env.server` (server-only secrets); never `process.env.X` directly except for `NODE_ENV`. `next.config.ts` calls `validateServerEnv()` from `@/lib/env` to fail-fast on missing required vars at build start
- No `any` types — TypeScript strict mode (`noUnusedLocals`, `noUnusedParameters`, `exactOptionalPropertyTypes`)
- `export default ComponentName` at the bottom of every component file — never both `export const` and `export default` for the same component
- PRD history is sacred — never overwrite or remove completed (`[✅]`) steps when updating a plan; use `[⬜]` / `[🔄]` / `[✅]` markers, never `[x]`

---

## Slash Commands

Project-level commands live in `.claude/commands/`. Each is invoked as `/<name> [args]`.

| Command | Purpose |
|---|---|
| `/plan [feature]` | Explore code + load skills + write a PRD at `.claude/plans/[kebab-name]/prd.md`. No code written. |
| `/implement [plan-name]` | Read the PRD, execute step-by-step, run quality gates, mark progress. |
| `/review [scope?]` | 6-priority code review (Security/A11y, Hydration/RSC, Data Layer, Perf, Effects/State, Conventions). Auto-writes a follow-up PRD on Critical/Warning findings. **Replaces deprecated `/audit`**. |
| `/review-i18n` | Translation parity audit — produces three PRDs: `missing-translations-audit`, `over-translation-audit`, `orphan-translation-keys-audit`. **Renamed from `/audit-i18n`**. |
| `/fix-issue [num\|description]` | TDD-first bug fix flow — write failing test, fix smallest unit, re-run gate. Optional `gh issue view` integration. |
| `/test [unit\|e2e\|i18n\|<file>]` | Run a test suite OR generate Vitest+RTL / Playwright tests for a target. |
| `/commit [message?]` | Smart commit with secret-scan, type(scope) prefix, HEREDOC body, sapan co-author trailer. |
| `/commit-staged [message?]` | Commit only what's already staged (no auto-staging). |
| `/push [flags?]` | Safe push — quality gate, branch guard, refuses force-push to default branch. |
| `/pr [base?]` | Create a structured PR with quality gate, auto-detected change categories, suggested merge-commit message. |
| `/merge [source]` | Safe local merge — quality gate, smart squash-vs-no-ff default, refuses dirty trees and divergent targets, never pushes. |
| `/e2e-add-spec [feature]` | Scaffold a new Playwright e2e spec via the `e2e-spec-author` agent — runs the spec on `chromium-desktop` and reports surface. |
| `/lhci` | Run Lighthouse CI locally against `/` and `/articles`, report budget verdict + score deltas vs the previous run. |
| `/gql-codegen` | Run GraphQL codegen + type-check; surface drift between `.graphql` operations and generated types. |
| `/gql-add-query [feature]` | Scaffold a new GraphQL operation end-to-end via the `graphql-architect` agent (decides RSC vs Client, writes operation + optional fragment, runs codegen, scaffolds component). |
| `/translate [locale?]` | i18n translation helper. |
| `/new-component [Name]` | Scaffold a new component per sapan conventions. |
| `/new-section [Name]` | Scaffold a new page section per sapan conventions. |
| `/fix-tw-diagnostics [scope?]` | Sweep `suggestCanonicalClasses` (v3 alias names, prefix `!`, arbitrary-property hints) and `cssConflict` (duplicate-property utilities). Thin wrapper around `pnpm run lint:fix` — the four `better-tailwindcss/*` ESLint rules (wired via `.formatter/sync.js`) auto-fix every canonical migration; cssConflict findings are reported for manual resolution. See [.claude/skills/workflow/tailwind-diagnostics.md](.claude/skills/workflow/tailwind-diagnostics.md). |

**Removed:** `/audit` (subsumed by `/review`). **Renamed:** `/audit-i18n` → `/review-i18n`. **Not adopted:** R&D's standalone `/feature` (merged into `/plan`).

## Agents

Custom agents live in `.claude/agents/`. Invoked via the Agent tool with the matching `subagent_type`.

| Agent | When to invoke |
|---|---|
| `code-reviewer` | Before commit / before PR — runs the same 6-priority checklist as `/review`, but in a parallel agent context. Auto-writes PRD on violations. |
| `test-writer` | When adding/changing components or fixing bugs TDD-style. Generates Vitest+RTL tests with sapan's `render` from `tests/test-utils.tsx`. Apollo `MockedProvider` patterns apply when files import from `@/lib/apollo/`. |
| `e2e-spec-author` | When `/implement` decides a feature warrants Playwright e2e coverage. Scaffolds the spec from a feature description, decides project matrix + mock surface, runs on `chromium-desktop` for fast feedback. Invoked via `/e2e-add-spec` or directly via the Agent tool. |
| `graphql-architect` | When a feature needs remote GraphQL data. Designs and scaffolds operations end-to-end: decides RSC vs Client, forces RSC when `GRAPHQL_AUTH_TOKEN` is required, writes operation + optional fragment, runs codegen + type-check. Invoked via `/gql-add-query` or directly via the Agent tool. |

## External Skills Library

Framework-level reference skills live in `.claude/skills/external/{nextjs,react,typescript,testing,design,data,tooling}/`. Sapan rules in `.claude/skills/{architecture,design-system,workflow}/` are **authoritative** — when external guidance conflicts with sapan rules, sapan wins.

See [`.claude/skills/external/README.md`](.claude/skills/external/README.md) for the full index, source attribution, and per-category overlap notes.
