# /test [unit|e2e|i18n?]

**Purpose:** Run the appropriate test suite, analyze failures, and fix them.

Steps Claude must follow:
1. Load `skills/workflow/testing.md`
2. Determine scope from `$ARGUMENTS`:
   - `unit` → `pnpm run test`
   - `e2e` → `pnpm run test:e2e`
   - `i18n` → compare all locale files in `src/i18n/locales/` against `en/` baseline, report missing keys
   - empty → run `pnpm run test` then `pnpm run test:e2e`
3. Run the command and capture output
4. If all pass: report summary (suites, tests, duration)
5. If failures: for each failing test:
   - Show test name + file location
   - Read the relevant source file
   - Diagnose root cause (logic bug, type mismatch, missing mock, stale snapshot)
   - Apply a fix
   - Re-run only the failed test to confirm it passes
6. Final report: tests fixed, tests still failing (if any), next steps

**Rules:** Fix the real issue — do not delete or skip failing tests. Do not widen types to silence errors.
