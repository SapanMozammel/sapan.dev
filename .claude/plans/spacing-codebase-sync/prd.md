# Feature: Sync Codebase Against spacing.md

## Context
Audit all components against the updated spacing.md skill. Deep audit found: (1) five sections carry the intended double bottom spacing split across section + container — consolidate to 2× value on section only; (2) article detail page has unintended duplicate pb and wrong gap value.

## Component Type Decision
- N/A — no new components; fixes are class string edits + skill documentation

## Affected Files
- `.claude/skills/design-system/spacing.md` — document double-spacing pattern + vw exceptions
- `src/components/layout/Faq/index.tsx` — consolidate pb to section, remove from container
- `src/components/layout/Blog/index.tsx` — consolidate pb to section, remove from container
- `src/components/layout/Portfolio/index.tsx` — consolidate pb to section, remove from container
- `src/components/layout/Experience/index.tsx` — consolidate pb to section, remove from container
- `src/components/layout/Workflow/index.tsx` — consolidate pb to section, remove from container
- `src/app/[locale]/articles/[slug]/page.tsx` — remove duplicate pb from container + fix gap-8 → gap-4 sm:gap-5

## New Files
None

## Design System
**Standard section pattern** (Technologies, Testimonials, Hero, CTA):
```
<section className='... pb-8 sm:pb-12 lg:pb-16'>
  <div className='container ...'>   ← no pb
```

**Double-spacing section pattern** (FAQ, Blog, Portfolio, Experience, Workflow — 2× bottom spacing):
```
<section className='... pb-16 sm:pb-24 lg:pb-32'>
  <div className='container ...'>   ← no pb
```

## Implementation Steps

### Round 1 — Skill documentation
- [✅] Step 1: Add "Intentional Viewport-Relative Values" section to spacing.md
- [✅] Step 2: Update spacing.md — document double-spacing section pattern (`pb-16 sm:pb-24 lg:pb-32`) for FAQ, Blog, Portfolio, Experience, Workflow

### Round 2 — Consolidate section padding
- [✅] Step 3: `Faq/index.tsx` — set section to `pb-16 sm:pb-24 lg:pb-32`, remove pb from container
- [✅] Step 4: `Blog/index.tsx` — set section to `pb-16 sm:pb-24 lg:pb-32`, remove pb from container
- [✅] Step 5: `Portfolio/index.tsx` — set section to `pb-16 sm:pb-24 lg:pb-32`, remove pb from container
- [✅] Step 6: `Experience/index.tsx` — set section to `pb-16 sm:pb-24 lg:pb-32`, remove pb from container
- [✅] Step 7: `Workflow/index.tsx` — set section to `pb-16 sm:pb-24 lg:pb-32`, remove pb from container

### Round 3 — Fix article page
- [✅] Step 8: `articles/[slug]/page.tsx:144` — remove `pb-8 sm:pb-12 lg:pb-16` from `.container` + change `gap-8` → `gap-4 sm:gap-5`

### Round 3 — Finalize
- [✅] Step 9: Run pnpm run format:all — 0 errors
- [✅] Step 10: Run pnpm run type:check — 0 errors
- [✅] Step 11: Run pnpm run test — 190 passed

## Verification
- [⬜] pnpm run dev → check bottom spacing of FAQ, Blog, Portfolio, Experience, Workflow
- [⬜] pnpm run dev → check article detail page
- [⬜] pnpm run type:check — 0 errors
- [⬜] pnpm run test — 190 passed
