# PRD: Migrate className Concatenation to cn()

**Date:** 2026-04-08
**Status:** Done
**Priority:** Medium
**Phase:** 4 of 6 (Audit Compliance)
**Scope:** 4 files, 7 violation groups

---

## Problem

Seven groups of className assignments use template-literal string concatenation instead of the `cn()` utility. This bypasses Tailwind's class merging, makes conditional classes harder to read, and violates the project's component-patterns rules.

## Goal

Replace all template-literal className composition with `cn()` calls in `src/components/`.

## Non-Goals

- Changing the visual output of any component
- Refactoring component structure or props

---

## Fixes

### SectionSeparator (`src/components/layout/common/SectionSeparator.tsx`)

Must add `import { cn } from '@/lib/utils'` — currently missing.

| ID | Line | Current | Required |
|----|------|---------|----------|
| CN-1 | 20 | `` `section-separator pointer-events-none select-none ${className ?? ''}` `` | `cn('section-separator pointer-events-none select-none', className)` |
| CN-2 | 25-32 | `` `${STAR_CLASSES} absolute top-0 ...` `` on 8 lines | `cn(STAR_CLASSES, 'absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2')` per element; same for LINE_CLASSES lines |

### SectionTitle (`src/components/layout/common/SectionTitle.tsx`)

Already imports `cn`.

| ID | Line | Current | Required |
|----|------|---------|----------|
| CN-3 | 14 | `` `font-hg ... ${watermark ? 'pt-[10vw]' : 'pt-[2vw]'} ...` `` | `cn('font-hg text-secondary-400 dark:text-secondary-600 text-sm leading-none font-semibold tracking-widest uppercase', watermark ? 'pt-[10vw]' : 'pt-[2vw]')` |
| CN-4 | 15 | `` `font-cg ${subtitle ? 'mt-1 sm:mt-3' : 'mt-5 mb-4 sm:mt-7'} ...` `` | `cn('font-cg text-dark mb-2 text-3xl leading-none font-medium tracking-wide sm:text-5xl dark:text-white', subtitle ? 'mt-1 sm:mt-3' : 'mt-5 mb-4 sm:mt-7')` |

### ThemeSwitcher (`src/components/layout/common/ThemeSwitcher.tsx`)

Already uses `cn` elsewhere in the file — verify import exists, otherwise add it.

| ID | Line | Current | Required |
|----|------|---------|----------|
| CN-5 | 152-156 | Template literal with ternary for active/inactive button state | `cn('flex w-full cursor-pointer items-center justify-between gap-1.5 rounded-md px-2 py-1.5 text-xs transition-colors sm:text-sm', mounted && theme === option.name ? 'bg-primary/10 text-primary dark:bg-success/10 dark:text-success' : 'text-secondary-500 dark:text-secondary-500 hover:text-primary dark:hover:text-success')` |

### LanguageSwitcher (`src/components/layout/common/LanguageSwitcher.tsx`)

Same pattern as ThemeSwitcher.

| ID | Line | Current | Required |
|----|------|---------|----------|
| CN-6 | 80-84 | Template literal with ternary for active/inactive language | Same `cn()` pattern as CN-5 |

### TestimonialBackground (`src/components/layout/Testimonials/TestimonialBackground.tsx`)

Already imports `cn`.

| ID | Lines | Current | Required |
|----|-------|---------|----------|
| CN-7 | 107-111 | Template literal for container class + `${STAR_CLASSES}` on 4 IconPlus elements | `cn('section-separator pointer-events-none select-none', className)` for container; `cn(STAR_CLASSES, 'absolute top-0 left-0 ...')` for each star |

## Acceptance Criteria

- [✅] `grep "className={\`" src/components/` returns zero matches
- [✅] All files touching classNames with variables or conditionals use `cn()`
- [✅] `SectionSeparator.tsx` has `import { cn } from '@/lib/utils'`
- [✅] `pnpm run type:check` passes
- [ ] `pnpm run build` succeeds (manual)
- [ ] Visual spot-check: SectionSeparator corners/lines, SectionTitle spacing, ThemeSwitcher/LanguageSwitcher active states, Testimonials background stars (manual)

## Risk

**Low** — purely cosmetic refactor. Possible visual regression if class order affects specificity. Spot-check each section after changes.
