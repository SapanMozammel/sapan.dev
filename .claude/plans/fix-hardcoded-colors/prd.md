# PRD: Fix Hardcoded Colors

**Date:** 2026-04-08
**Status:** Done
**Priority:** Medium
**Phase:** 6 of 6 (Audit Compliance)
**Scope:** 3 files

---

## Problem

Three component files contain hardcoded hex color values instead of referencing design system tokens. While these map to known token values (`#4a4ded` = primary, `#43ead4` = success), hardcoding them creates drift risk if tokens change and bypasses the single-source-of-truth principle.

One value (`#2ab8a5` in Particles.tsx) is entirely off-token.

## Goal

Eliminate all hardcoded hex values in non-SVG component files by:
1. Reading CSS custom properties at runtime for Workflow
2. Creating a shared color constants file for Three.js/shader components

## Non-Goals

- Modifying SVG icon files (Cloud.tsx, Pattern.tsx, Logo.tsx, WorldMap.tsx)
- Changing the actual color values used

---

## Fixes

### Workflow (`src/components/layout/Workflow/index.tsx`)

| ID | Line | Current | Required |
|----|------|---------|----------|
| DS-1 | 27 | `const activeColor = resolvedTheme === 'dark' ? '#43ead4' : '#4a4ded'` | Read from CSS: `getComputedStyle(document.documentElement).getPropertyValue('--color-success').trim()` / `'--color-primary'` — or use `var(--color-primary)` directly if the consumer supports CSS values |

### Three.js Particles

Read CSS custom properties at runtime via `getComputedStyle` (Three.js needs hex, not `var()`).

| ID | File | Lines | Current | Required |
|----|------|-------|---------|----------|
| DS-2 | `src/components/layout/Experience/particles/Particles.tsx` | 23-26 | 4 hardcoded hex constants | Use `getCSSColor('--color-primary')` / `getCSSColor('--color-success')` via `useState` initializer |
| DS-3 | `src/components/layout/Experience/particles/shaders/pointMaterial.ts` | 113-114 | Hardcoded hex in uniforms | Use neutral `new THREE.Color()` defaults (overwritten by Particles.tsx `useFrame`) |

## Acceptance Criteria

- [✅] `grep "#[0-9a-fA-F]\{3,8\}" src/components/layout/ src/components/ui/` returns zero matches
- [ ] Particle colors visually match current behavior in both light and dark themes (manual)
- [ ] Workflow progress bar color matches design tokens in both themes (manual)
- [✅] `pnpm run type:check` passes
- [ ] `pnpm run build` succeeds (manual)

## Risk

**Medium** — Three.js `Color` constructor requires hex strings or CSS color names, not CSS variables. The constants file approach preserves this requirement while centralizing values. Workflow fix depends on whether the color consumer (likely inline style or GSAP) supports CSS variable syntax.
