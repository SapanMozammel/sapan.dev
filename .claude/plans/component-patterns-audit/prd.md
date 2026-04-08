# Feature: Component Patterns Audit

## Context
Audit all components against the component-patterns skill and fix architecture violations. Design system violations (hardcoded colors, tokens) are tracked separately under the design-system skill.

## Affected Files
### Round 1
- `src/components/layout/Hero/admin/AdminEmailList.tsx` — template literal className instead of cn()
- `src/components/layout/Hero/admin/AdminSidebar.tsx` — template literal className instead of cn()
- `src/components/ui/technologies-display.tsx` — named export instead of export default
- `src/app/[locale]/not-found.tsx` — imports Link from next/link instead of @/i18n/navigation
- `src/app/[locale]/articles/[slug]/page.tsx` — imports Link from next/link; function declarations instead of arrow functions

### Round 2
- `src/components/ui/blog-card.tsx` — next/link instead of @/i18n/navigation
- `src/components/ui/project-card.tsx` — next/link instead of @/i18n/navigation

### Round 3
- `src/components/layout/Header/index.tsx` — next/link for internal routes
- `src/components/layout/Header/HeaderLogo.tsx` — next/link for internal routes
- `src/components/layout/Header/NavMenu.tsx` — next/link for internal routes
- `src/components/layout/Header/MobileNav.tsx` — next/link for mixed internal/external links
- `src/components/layout/Cta/CtaLogo.tsx` — next/link for internal routes
- `src/components/layout/Cta/CtaNav.tsx` — next/link for internal routes
- `src/components/layout/common/Button.tsx` — next/link for mixed internal/external `to` prop
- `src/components/layout/Cta/CtaConnect.tsx` — next/link for external-only links
- `src/providers/index.tsx` — missing memo() + displayName

## New Files
None

## Implementation Steps

### Round 1 (completed)
- [✅] Step 1: Fix cn() usage in AdminEmailList.tsx and AdminSidebar.tsx — replace template literal className concatenation with cn()
- [✅] Step 2: Fix export in technologies-display.tsx — add export default
- [✅] Step 3: Fix Link imports in [locale]/not-found.tsx — switch from next/link to @/i18n/navigation
- [✅] Step 4: Fix [locale]/articles/[slug]/page.tsx — switch Link to @/i18n/navigation, convert renderBlock and formatDate to arrow functions
- [✅] Step 5: Run pnpm run format:all
- [✅] Step 6: Run pnpm run type:check — 0 errors
- [✅] Step 7: Run pnpm run test — 190 passed

### Round 2 (completed)
- [✅] Step 8: Fix `src/components/ui/blog-card.tsx:7` — switched to `import { Link } from '@/i18n/navigation'`
- [✅] Step 9: Fix `src/components/ui/project-card.tsx:10` — switched to `import { Link } from '@/i18n/navigation'`, also fixed `TechnologiesDisplay` named→default import
- [✅] Step 10: Run pnpm run format:all — 0 warnings, 0 errors
- [✅] Step 11: Run pnpm run type:check — 0 errors
- [✅] Step 12: Run pnpm run test — 190 passed

### Round 3 — Architecture — Navigation Imports
Internal-only files: switch `import Link from 'next/link'` → `import { Link } from '@/i18n/navigation'`
Mixed/external files: use both — `import { Link } from '@/i18n/navigation'` + `import NextLink from 'next/link'`

- [✅] Step 13: Fix `src/components/layout/Header/index.tsx:3` — external only (GitHub) → renamed to `NextLink`
- [✅] Step 14: Fix `src/components/layout/Header/HeaderLogo.tsx:5` — internal only → `import { Link } from '@/i18n/navigation'`
- [✅] Step 15: Fix `src/components/layout/Header/NavMenu.tsx:5` — internal only → same
- [✅] Step 16: Fix `src/components/layout/Cta/CtaLogo.tsx:5` — internal only → same
- [✅] Step 17: Fix `src/components/layout/Cta/CtaNav.tsx:4` — internal only → same
- [✅] Step 18: Fix `src/components/layout/Header/MobileNav.tsx:9` — mixed: `Link` from i18n for internal + `NextLink` for GitHub
- [✅] Step 19: Fix `src/components/layout/common/Button.tsx:5` — both imports, runtime `isExternal` check with conditional rendering
- [✅] Step 20: Fix `src/components/layout/Cta/CtaConnect.tsx:5` — external only → renamed to `NextLink`

### Round 3 — Architecture — Missing memo/displayName
- [✅] Step 21: Fix `src/providers/index.tsx:17` — wrapped in memo(), added displayName, switched to export default, updated layout.tsx import

### Notes (no action needed)
- `src/app/not-found.tsx` — uses next/link intentionally (outside [locale] segment)
- `src/app/[locale]/articles/[slug]/page.tsx:11` — `notFound()` from next/navigation is a Next.js utility, not a navigation component
- `src/components/layout/common/Button/ButtonContent.tsx` — export const is acceptable for sub-components only used internally
- `src/components/ui/contact-modal/ContactStatusStates.tsx` — multiple named exports is acceptable for multi-component files

### Round 3 — Finalize
- [✅] Step 22: Run pnpm run format:all — 0 warnings, 0 errors
- [✅] Step 23: Run pnpm run type:check — 0 errors (fixed Button.tsx locale prop conflict)
- [✅] Step 24: Run pnpm run test — 190 passed

## Verification
- [⬜] pnpm run dev → verify all affected pages (manual)
- [⬜] Check dark mode on all affected pages (manual)
- [✅] pnpm run type:check — 0 errors
- [✅] pnpm run test — 190 passed
