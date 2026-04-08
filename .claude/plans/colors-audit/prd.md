# Feature: Colors Skill Audit

## Context
Article callout colors were migrated to semantic tokens and simplified (no dark swap needed). The colors.md skill needs updating to match.

## Affected Files
- `.claude/skills/design-system/colors.md` — stale callout pairs and warning token description

## Implementation Steps

### Round 1 (cancelled — bg-light/dark:bg-slate-900 is intentional)
- [✅] Step 1: Confirmed `bg-light` / `dark:bg-slate-900` is an intentional design rule
- [✅] Step 2: Added rule to colors.md skill
- [✅] Step 3: Saved to memory for future audits

### Round 2 — Fix stale docs
- [✅] Step 4: Fixed `colors.md:10` — removed "(unused in components)" from `--color-warning`, now used in article callouts
- [✅] Step 5: Fixed `colors.md:71` — updated callout bg to `bg-info/5`, `bg-warning/5`, `bg-success/5` (same both modes)
- [✅] Step 6: Fixed `colors.md:89` — updated callout text to `text-info`, `text-warning`, `text-success` (same both modes)
- [✅] Step 7: Fixed `colors.md:120` — updated callout border to `border-info/50`, `border-warning/50`, `border-success/50` (same both modes)

### Round 2 — Finalize
- [✅] Step 8: Run pnpm run type:check — 0 errors
- [✅] Step 9: Run pnpm run test — 190 passed

## Verification
- [✅] pnpm run type:check — 0 errors
- [✅] pnpm run test — 190 passed
