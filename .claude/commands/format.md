---
description: Run sapan's formatter (organize-imports + Prettier + ESLint --fix) and sweep Tailwind v3 `!utility` patterns to v4 `utility!` form.
allowed-tools: Bash(pnpm run format:all*), Bash(pnpm run lint*), Bash(pnpm run type:check*), Bash(grep:*), Bash(git status:*), Bash(git diff:*), Read, Edit, Glob
---

# Format

## Skills to load FIRST

- `tailwind-v4-syntax` (sapan workflow) — the canonical reference for `!utility` → `utility!` migration. Load this before scanning so you suggest the correct rewrite for each finding (variant prefix preserved, base class gets the trailing `!`).

## Process

1. **Run the formatter pipeline.** This handles organize-imports, Prettier (with `prettier-plugin-tailwindcss` class sorting), and ESLint `--fix` in the right order:
   ```bash
   pnpm run format:all
   ```
   If it errors on any file, fix the underlying issue and rerun.

2. **Sweep Tailwind v3 `!utility` patterns** that Prettier's class sorter does NOT rewrite (only the v3 form's `!` position is wrong; the order is fine):
   ```bash
   # TSX/TS classNames + cn() args
   grep -rEn "['\"\`][^'\"\`]*![a-z][a-z0-9-]+" src --include='*.tsx' --include='*.ts'

   # SCSS @apply directives
   grep -nE "@apply[^;]*![a-z][a-z0-9-]+" src/styles/*.scss
   ```

3. **For each finding, apply the rewrite per the `tailwind-v4-syntax` skill:**
   - `!h-9` → `h-9!`
   - `sm:!h-11` → `sm:h-11!` (variant stays in front, `!` to the very end)
   - `dark:!bg-success` → `dark:bg-success!`
   - Same rule inside `@apply`: `@apply font-hg !leading-tight` → `@apply font-hg leading-tight!`

   Do NOT touch JS negation (`!ctx`, `!body.contains(...)`) — those are JavaScript, not Tailwind. The grep above stays inside quoted strings to avoid them.

4. **Re-run the formatter pipeline** so Prettier's class sorter and ESLint can settle the rewritten lines (the `!` move can shift class ordering):
   ```bash
   pnpm run format:all
   ```

5. **Final gate** — verify the sweep didn't break anything:
   ```bash
   pnpm run type:check
   pnpm run lint
   ```

## Output

Report what landed:
- `pnpm run format:all` — summary line (pass/fail; how many files prettier/ESLint touched)
- Tailwind v3 → v4 sweep — count of files changed + per-file list of `original → suggested` rewrites
- Final gate verdict (lint + type-check)

If nothing was found in Step 2, say so plainly — no need to invent work.

## Rules

- Do NOT run `pnpm dlx @tailwindcss/upgrade` here. That codemod also rewrites configs and tokens; this command is scoped to the `!utility` syntax sweep only. Use the codemod separately if a full v3→v4 migration is needed.
- Use the **Edit** tool for surgical rewrites (one `old_string` / `new_string` per finding); never Write to whole files for a 2-character syntax change.
- Skip files in `.claude/skills/external/` and `node_modules/` — the grep paths above already exclude them by scoping to `src/` and `src/styles/`.
