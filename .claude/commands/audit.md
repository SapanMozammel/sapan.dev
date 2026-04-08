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
7. If violations found: create or update a PRD at `.claude/plans/[audit-scope]-audit/prd.md` with all violations as implementation steps

**Rules:** Report numbered, actionable fixes only. No full rewrites unless asked. Do not auto-apply fixes — present them for review. Always generate a PRD after the audit so violations can be fixed via `/implement`.
