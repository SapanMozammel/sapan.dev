# PRD: Fix TypeScript Violations

**Date:** 2026-04-08
**Status:** Done
**Priority:** Low
**Phase:** 2 of 6 (Audit Compliance)
**Scope:** 2 files

---

## Problem

Two TypeScript convention violations exist in `src/components/`:
1. An `interface` declaration where `type` is required by project rules
2. An `as any` cast that bypasses type safety

## Goal

Eliminate all `interface` and `any` usage in component files.

## Non-Goals

- Changing component behavior or APIs
- Modifying third-party type definitions

---

## Fixes

| ID | File | Line | Current | Required |
|----|------|------|---------|----------|
| TS-1 | `src/components/ui/sheet.tsx` | 40 | `interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>, VariantProps<typeof sheetVariants> {}` | `type SheetContentProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & VariantProps<typeof sheetVariants>` |
| TS-2 | `src/components/layout/common/ThemeSwitcher.tsx` | 59 | `themes.indexOf(themeString as any)` | Type `themeString` as `(typeof themes)[number]` or use a type guard |

## Acceptance Criteria

- [✅] `grep "^interface\s" src/components/` returns zero matches
- [✅] `grep "as any" src/components/` returns zero matches
- [✅] `pnpm run type:check` passes with zero errors
