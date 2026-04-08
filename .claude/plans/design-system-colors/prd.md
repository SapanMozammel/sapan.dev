# Feature: Design System Colors Implementation

## Context
Replace all remaining hardcoded primitive colors with design system semantic tokens per the colors.md skill rules. Blog category and portfolio card primitives are intentional (per-item coloring) and excluded.

## Component Type Decision
- N/A — refactor across existing files, no new components

## Affected Files
- `src/app/[locale]/error.tsx` — `text-red-600`, `bg-blue-600`, `bg-gray-600`, `text-gray-*`, `bg-gray-100/800`
- `src/app/not-found.tsx` — `text-gray-900/700/600`, `bg-blue-600`
- `src/app/[locale]/loading.tsx` — `text-blue-600`, `text-gray-600`
- `src/components/ui/diamond-grid.tsx` — `bg-red-400`
- `src/components/layout/Workflow/index.tsx` — `bg-blue-500/10`, `bg-purple-500/5`

## New Files
None

## Design System
Token mappings per colors.md:
- `text-red-600 dark:text-red-400` → `text-danger`
- `text-gray-900 dark:text-white` → `text-dark dark:text-white`
- `text-gray-700 dark:text-gray-300` → `text-secondary-600 dark:text-secondary-400`
- `text-gray-600 dark:text-gray-400` → `text-secondary-500 dark:text-secondary-500`
- `text-gray-500` → `text-secondary-500`
- `text-blue-600 dark:text-blue-400` → `text-primary dark:text-success`
- `bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600` → `bg-primary hover:opacity-90 dark:bg-success dark:text-dark`
- `bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600` → `bg-secondary-600 hover:opacity-90`
- `bg-gray-100 dark:bg-gray-800` → `bg-secondary-100 dark:bg-secondary-800`
- `bg-red-400` → `bg-gradient-to-b from-secondary-200/50 dark:from-secondary-700/50 dark:to-secondary-900/50 to-secondary/50`
- `bg-blue-500/10` → `bg-info/10`
- `bg-purple-500/5` → `bg-primary/10`

## i18n
No changes

## Implementation Steps
- [✅] Step 1: Fix `src/app/[locale]/error.tsx` — replaced text-red-600→text-danger, bg-blue-600→bg-primary dark:bg-success, bg-gray-600→bg-secondary-600, text-gray→text-secondary, bg-gray→bg-secondary
- [✅] Step 2: Fix `src/app/not-found.tsx` — replaced text-gray-900→text-dark, text-gray-700→text-secondary-600, text-gray-600→text-secondary-500, bg-blue-600→bg-primary dark:bg-success
- [✅] Step 3: Fix `src/app/[locale]/loading.tsx` — replaced text-blue-600→text-primary dark:text-success, text-gray-600→text-secondary-500
- [✅] Step 4: Fix `src/components/ui/diamond-grid.tsx:123` — replaced `bg-red-400` with `bg-gradient-to-b from-secondary-200/50 dark:from-secondary-700/50 dark:to-secondary-900/50 to-secondary/50`
- [✅] Step 5: Fix `src/components/layout/Workflow/index.tsx:72-73` — replaced `bg-blue-500/10` with `bg-info/10`, `bg-purple-500/5` with `bg-primary/10`
- [✅] Step 6: Run pnpm run format:all — 0 errors
- [✅] Step 7: Run pnpm run type:check — 0 errors
- [✅] Step 8: Run pnpm run test — 190 passed

## Verification
- [⬜] pnpm run dev → verify error page styling
- [⬜] pnpm run dev → verify not-found page
- [⬜] pnpm run dev → verify loading spinner
- [⬜] pnpm run dev → verify diamond grid
- [⬜] pnpm run dev → verify workflow section
- [⬜] Check dark mode on all affected pages
- [✅] pnpm run type:check — 0 errors
- [✅] pnpm run test — 190 passed
