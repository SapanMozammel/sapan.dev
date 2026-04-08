# Feature: Testing Skill Audit

## Context
The testing.md skill has a wrong import path example for test-utils and is missing `@/i18n/navigation` from the global mocks list.

## Affected Files
- `.claude/skills/workflow/testing.md` — wrong import path, missing mock

## New Files
None

## Implementation Steps

### Round 1
- [✅] Step 1: Fixed `testing.md:45` — changed import path from `@/tests/test-utils` to `../test-utils` (relative, matching actual usage)
- [✅] Step 2: Fixed `testing.md:38` — added `@/i18n/navigation` to global mocks list

### Round 1 — Finalize
- [✅] Step 3: Run pnpm run type:check — 0 errors
- [✅] Step 4: Run pnpm run test — 190 passed

## Verification
- [✅] pnpm run type:check — 0 errors
- [✅] pnpm run test — 190 passed
