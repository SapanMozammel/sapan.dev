# PRD: Fix Remaining Audit Violations

**Date:** 2026-04-08
**Status:** Done
**Priority:** Low
**Scope:** 2 files, 3 violations

---

## Problem

After completing all 6 audit compliance phases, 3 violations remain:
1. Two `as any` casts in `Button.tsx` that bypass the existing discriminated union type
2. One unnecessary template-literal className in `Technologies/index.tsx` (static string, no variables)

## Goal

Eliminate all remaining `as any` usage and template-literal classNames in `src/components/`.

## Non-Goals

- Changing Button component behavior or API
- Restructuring the Button type hierarchy (it's already well-defined)

---

## Fixes

### Button (`src/components/layout/common/Button.tsx`)

The types already define a discriminated union (`LinkButtonProps | RegularButtonProps`) keyed on the `to` prop. The `as any` casts are unnecessary — TypeScript can narrow the union after the `'to' in props` check.

| ID | Line | Current | Required |
|----|------|---------|----------|
| ANY-1 | 48 | `const { to, ...linkProps } = rest as any` | Use type narrowing: `const { to, ...linkProps } = rest as Omit<LinkButtonProps, 'loading' \| 'fill' \| 'gradient' \| 'children' \| 'className'>` |
| ANY-2 | 58 | `const { disabled, ...buttonProps } = rest as any` | Use type narrowing: `const { disabled, ...buttonProps } = rest as Omit<RegularButtonProps, 'loading' \| 'fill' \| 'gradient' \| 'children' \| 'className'>` |

**Alternative approach:** Extract a helper type in `src/types/button.ts`:

```ts
type RestProps<T extends ButtonProps> = Omit<T, keyof BaseButtonProps | 'children' | 'className'>
```

Then use `rest as RestProps<LinkButtonProps>` and `rest as RestProps<RegularButtonProps>`.

### Technologies (`src/components/layout/Technologies/index.tsx`)

| ID | Line | Current | Required |
|----|------|---------|----------|
| TPL-1 | 26 | `` className={`from-secondary-200/50 ...`} `` | Change to `className='from-secondary-200/50 ...'` (plain string, no template literal needed) |

## Acceptance Criteria

- [✅] `grep "as any" src/components/` returns zero matches
- [✅] `grep "className={\`" src/components/` returns zero matches
- [✅] `pnpm run format:all` passes
- [✅] `pnpm run type:check` passes
- [✅] `pnpm run test` passes
