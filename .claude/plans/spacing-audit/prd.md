# Feature: Spacing Skill Audit

## Context
The spacing.md skill has wrong form input padding, incomplete card padding docs, and is missing several actively used spacing patterns (header height, footer, section-separator utility, accordion, modal, hero top padding, and gap variations).

## Affected Files
- `.claude/skills/design-system/spacing.md` — fix wrong values and add missing patterns

## New Files
None

## Implementation Steps

### Round 1 — Fix wrong values
- [✅] Step 1: Fix form input padding — `px-4 py-2.5` → `px-3 py-2.5`
- [✅] Step 2: Fix card padding — expand to show per-component patterns: BlogCard `p-5`, ProjectCard `p-4 sm:p-6 lg:p-8 xl:p-12`, TimelineItem `p-4 md:p-6`, ContactModal `p-6 sm:p-7`

### Round 1 — Add missing patterns
- [✅] Step 3: Add header height — `h-14 sm:h-20` (fixed position)
- [✅] Step 4: Add footer spacing — `py-4 sm:py-6`
- [✅] Step 5: Add section-separator utility — `absolute inset-x-3 inset-y-0 -z-10 md:inset-x-10`
- [✅] Step 6: Add section spacing exceptions — Testimonials `pb-16 sm:pb-20 lg:pb-24`, Cta `py-8 sm:py-12 lg:py-16`, Hero section `pt-14 sm:pt-20`, Hero container `pt-16 sm:pt-24 lg:pt-32`
- [✅] Step 7: Add content gap variations — note that Workflow/Testimonials use `gap-8` instead of standard `gap-4 sm:gap-5`
- [✅] Step 8: Add accordion padding — `px-5 py-4 lg:px-8 lg:py-5` (buttons), `px-5 lg:px-8 pb-4 lg:pb-5` (content)
- [✅] Step 9: Add workflow card padding — `p-6 md:p-8`

### Round 1 — Add more missing patterns (from deep re-audit)
- [✅] Step 10: Add article detail padding — `p-6 sm:p-8 lg:p-10`
- [✅] Step 11: Add CTA hero card padding — `p-8 sm:p-12 lg:p-16`
- [✅] Step 12: Add article callout padding — `p-4 sm:p-5`
- [✅] Step 13: Add nav link padding — `px-2 lg:px-3 py-1.5`

### Round 1 — Finalize
- [✅] Step 14: Run pnpm run type:check — 0 errors
- [✅] Step 15: Run pnpm run test — 190 passed

## Verification
- [✅] pnpm run type:check — 0 errors
- [✅] pnpm run test — 190 passed
