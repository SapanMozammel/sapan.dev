---
name: tailwind-v4-syntax
description: "Triggers when editing classNames or @apply directives that use Tailwind v3 syntax in this v4 project. Most common: the `!important` modifier moved from prefix (`!h-9`) to suffix (`h-9!`). Also flags any v3-only utilities/variants that don't exist in v4. Use when authoring or refactoring components, fixing IDE `suggestCanonicalClasses` diagnostics, or sweeping the codebase for v4 hygiene."
---

# Tailwind v4 Syntax (sapan is on `tailwindcss@^4.2.4`)

## Important modifier moved from prefix to suffix

| v3 (legacy, still works via backwards-compat) | v4 (canonical) |
|---|---|
| `!h-9` | `h-9!` |
| `!leading-none` | `leading-none!` |
| `!text-transparent` | `text-transparent!` |
| `!font-normal` | `font-normal!` |
| `!outline-none` | `outline-none!` |
| `!px-[calc(theme(height.9)*21/44)]` | `px-[calc(theme(height.9)*21/44)]!` |

The `!` always sits at the **end of the entire utility**, after any variant prefix has done its work:

| v3 | v4 |
|---|---|
| `sm:!h-11` | `sm:h-11!` |
| `dark:!bg-success` | `dark:bg-success!` |
| `hover:!text-primary` | `hover:text-primary!` |
| `motion-reduce:!animate-none` | `motion-reduce:animate-none!` |

Same rule for `@apply` directives in SCSS:

```scss
/* v3 */
@apply font-hg text-3xl !leading-tight font-bold;

/* v4 */
@apply font-hg text-3xl leading-tight! font-bold;
```

## How to find them

```bash
# In TSX/TS classNames + cn() args
grep -rEn "['\"\`][^'\"\`]*![a-z][a-z0-9-]+" src --include='*.tsx' --include='*.ts'

# In SCSS @apply directives
grep -nE "@apply[^;]*![a-z][a-z0-9-]+" src/styles/*.scss
```

Both regexes match the v3 form (`!utility`). The v4 form (`utility!`) needs `[a-z0-9-]+!\b` — different shape, no overlap.

The VS Code Tailwind CSS IntelliSense extension also flags every v3-form occurrence with the diagnostic code `suggestCanonicalClasses` once `.vscode/settings.json` points it at sapan's CSS entry.

## How to fix

**Single utility:** move the `!` to the end of the base class, leaving any variant prefix in place.

**Whole codebase, focused sweep:** invoke `/format` — it runs `pnpm run format:all`, scans for `!utility` patterns in TSX/TS classNames + SCSS `@apply` directives, applies the v4 rewrite per this skill, then re-runs `format:all` so Prettier's class sorter settles, and finally gates with `lint` + `type:check`.

**Full v3 → v4 migration (config + tokens + syntax):** the upstream codemod handles every case but is broader scope:

```bash
pnpm dlx @tailwindcss/upgrade
```

Use the codemod when also migrating `tailwind.config.ts` shape, theme tokens, etc. For a `!utility` syntax-only sweep, `/format` is the right tool — it's scoped, idempotent, and won't touch your token files.

## What NOT to change

- Plain JavaScript negation (`!isOpen`, `!ctx`, `!body.contains(...)`) — these are JS, not Tailwind classes. The grep above stays inside quoted strings to avoid them.
- `!important` declarations in raw CSS (`color: red !important`) — that's CSS spec, untouched by either Tailwind version.

## See also

- [`design-system/colors.md`](../design-system/colors.md), [`design-system/typography.md`](../design-system/typography.md), [`design-system/spacing.md`](../design-system/spacing.md) — sapan token rules that complement this v4-syntax rule
- [`architecture/component-patterns.md`](../architecture/component-patterns.md) — `cn()` mandate for className composition
