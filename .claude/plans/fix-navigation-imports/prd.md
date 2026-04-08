# PRD: Fix Navigation Imports

**Date:** 2026-04-08
**Status:** Done
**Priority:** High
**Phase:** 1 of 6 (Audit Compliance)
**Scope:** 5 files

---

## Problem

Five client components import `usePathname` and `useRouter` from `next/navigation` instead of `@/i18n/navigation`. This bypasses next-intl's locale-aware routing, which can cause broken locale prefixes and incorrect URL generation across all 16 supported locales.

## Goal

Replace all `next/navigation` imports in `src/components/` with `@/i18n/navigation`.

## Non-Goals

- Changing navigation logic or component behavior
- Touching imports outside `src/components/`

---

## Fixes

| ID | File | Line | Change |
|----|------|------|--------|
| NAV-1 | `src/components/layout/Cta/CtaLogo.tsx` | 5 | `'next/navigation'` -> `'@/i18n/navigation'` |
| NAV-2 | `src/components/layout/Header/HeaderLogo.tsx` | 5 | `'next/navigation'` -> `'@/i18n/navigation'` |
| NAV-3 | `src/components/layout/Header/NavMenu.tsx` | 5 | `'next/navigation'` -> `'@/i18n/navigation'` |
| NAV-4 | `src/components/layout/Header/MobileNav.tsx` | 9 | `'next/navigation'` -> `'@/i18n/navigation'` |
| NAV-5 | `src/components/layout/Cta/CtaNav.tsx` | 4 | `'next/navigation'` -> `'@/i18n/navigation'` |

## Acceptance Criteria

- [✅] `grep "from 'next/navigation'" src/components/` returns zero matches
- [✅] `pnpm run type:check` passes
- [ ] `pnpm run build` succeeds (manual verification needed)
- [ ] Manual: navigate all 16 locales, verify URL prefixes and active nav state

## Risk

**High** — affects i18n routing. Must verify `usePathname` and `useRouter` from `@/i18n/navigation` expose the same API surface used by these components.
