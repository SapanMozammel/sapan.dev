# PRD: Fix Missing memo() Wrappers

**Date:** 2026-04-08
**Status:** Done
**Priority:** Low
**Phase:** 3 of 6 (Audit Compliance)
**Scope:** 2 files

---

## Problem

Two client components (`ThemeSwitcher`, `LanguageSwitcher`) lack the mandatory `memo()` wrapper and `displayName` assignment required by the component-patterns architecture rules. This can cause unnecessary re-renders in the header where both components live.

## Goal

Wrap both components with `memo()` and add `.displayName`.

## Non-Goals

- Refactoring component internals
- Adding memo to shadcn/ui forwardRef components (those follow Radix convention)

---

## Fixes

| ID | File | Line | Change |
|----|------|------|--------|
| MEMO-1 | `src/components/layout/common/ThemeSwitcher.tsx` | 26 | `const ThemeSwitcher = () => {` -> `const ThemeSwitcher = memo(() => {` + closing `)` + add `ThemeSwitcher.displayName = 'ThemeSwitcher'` |
| MEMO-2 | `src/components/layout/common/LanguageSwitcher.tsx` | 14 | `const LanguageSwitcher = () => {` -> `const LanguageSwitcher = memo(() => {` + closing `)` + add `LanguageSwitcher.displayName = 'LanguageSwitcher'` |

Both files already import from `react` — add `memo` to the existing import.

## Acceptance Criteria

- [✅] Every `'use client'` file in `src/components/` uses `memo()` / `React.memo()` or `React.forwardRef()`
- [✅] Each memoized component has a matching `.displayName`
- [✅] `pnpm run type:check` passes
- [ ] `pnpm run build` succeeds (manual)
