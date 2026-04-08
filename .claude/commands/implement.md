# /implement [plan-name]

**Purpose:** Read a plan and implement it step by step.

Steps Claude must follow:
1. Read `.claude/plans/[plan-name]/prd.md` fully before any code
2. Read all files listed under Affected Files and New Files
3. Load all skills: `component-patterns.md`, `colors.md`, `typography.md`, `spacing.md`, `routing.md`, `state.md`, `data.md`
4. Execute each step in order — before starting a step, add subtasks if it needs breakdown; mark `[🔄]` while running, `[✅]` when done; update `prd.md` in place
5. Apply pre-write checklist (from `component-patterns.md`) to every component touched
6. Run `pnpm run type:check` — fix all errors before continuing
7. Run `pnpm run test` — fix any broken tests before finishing
8. Report: files created, files modified, type check result, test result, verification steps

**Rules:** Implement only what's in the plan. Ask before guessing ambiguous steps. Do not add unrequested features.
