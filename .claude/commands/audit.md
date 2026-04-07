# /audit [file?]

**Purpose:** Check a file against all design system and architecture rules.

Steps Claude must follow:
1. Target = `$ARGUMENTS` if provided, otherwise the file currently open in the editor
2. Read the file fully
3. Load: `colors.md`, `typography.md`, `spacing.md`, `component-patterns.md`
4. Check every rule in the pre-write checklist
5. Report violations by category:
   - **Design System** — hardcoded colors, wrong font class, arbitrary spacing
   - **Architecture** — missing `'use client'`, missing `memo()`, wrong import path
   - **TypeScript** — `any` types, missing types, `interface` used instead of `type`
   - **Pass** — what's already correct
6. For each violation: `file:line` — rule broken — fix

**Rules:** Report numbered, actionable fixes only. No full rewrites unless asked. Do not auto-apply fixes — present them for review.
