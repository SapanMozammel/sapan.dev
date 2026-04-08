# Feature: Feature Planning Skill Audit

## Context
The feature-planning.md skill is missing the PRD history preservation rule that exists in CLAUDE_SETUP.md and CLAUDE.md. This rule is critical to the audit → PRD → implement workflow.

## Affected Files
- `.claude/skills/workflow/feature-planning.md` — missing PRD history rule

## New Files
None

## Implementation Steps

### Round 1
- [✅] Step 1: Added PRD history preservation rule after task status convention section

### Round 1 — Finalize
- [✅] Step 2: Run pnpm run type:check — 0 errors
- [✅] Step 3: Run pnpm run test — 190 passed

## Verification
- [✅] pnpm run type:check — 0 errors
- [✅] pnpm run test — 190 passed
