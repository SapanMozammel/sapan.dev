# PRD: Fix Function Declaration

**Date:** 2026-04-08
**Status:** Done
**Priority:** Low
**Phase:** 5 of 6 (Audit Compliance)
**Scope:** 1 file

---

## Problem

One utility function in the particle shader module uses a `function` declaration instead of the project-mandated arrow function syntax.

## Goal

Convert the function declaration to an arrow function.

---

## Fix

| ID | File | Line | Current | Required |
|----|------|------|---------|----------|
| FN-1 | `src/components/layout/Experience/particles/shaders/simulationMaterial.ts` | 4 | `function getPlane(count: number, components: number, size: number = 512, scale: number = 1.0) {` | `const getPlane = (count: number, components: number, size: number = 512, scale: number = 1.0) => {` |

## Acceptance Criteria

- [✅] `grep "^(export\s+)?function\s+" src/components/` returns zero matches
- [✅] `pnpm run type:check` passes
