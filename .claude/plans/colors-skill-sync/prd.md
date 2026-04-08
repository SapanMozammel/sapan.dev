# Feature: Deep Sync colors.md Skill

## Context
The colors.md skill is missing several actively used color pairs — primarily the admin dashboard info-color ecosystem, button SVG fill/stroke pairs, and the `shadow-info/10` pair. All hardcoded primitives in components/app are now resolved. This plan adds the undocumented pairs to the skill.

## Component Type Decision
- N/A — documentation-only changes to the skill file

## Affected Files
- `.claude/skills/design-system/colors.md` — add missing documented pairs

## New Files
None

## Design System
Missing pairs to document:

### Backgrounds — missing
- `bg-light/70` | `dark:bg-slate-900/70` — already documented (line 59) ✅
- `bg-light/20` | `dark:bg-slate-900/20` — admin screen container (NOT documented)
- `bg-light/10` | `dark:bg-slate-900/10` — admin travel card (NOT documented)
- `bg-info/30` | — | Admin dashboard buttons, avatars, email cards (NOT documented)

### Borders — missing
- `border-info/20` | — | Admin travel card outer border (NOT documented)
- `border-info/30` | — | Admin dashboard panels, dividers, inputs (NOT documented)
- `border-info/50` | — | Admin decorative circles, performance ring (NOT documented)

### Shadows — missing
- `shadow-info/10` | — | Admin screen container shadow (NOT documented)

### Fills & Strokes — missing
- `fill-dark` | `dark:fill-white` | Button SVG paths (NOT documented)
- `stroke-dark` | `dark:stroke-white` | Button SVG paths (NOT documented)
- `group-hover/button:fill-primary` | `dark:group-hover/button:fill-success` | Button SVG hover (NOT documented)
- `group-hover/button:stroke-primary` | `dark:group-hover/button:stroke-success` | Button SVG hover (NOT documented)
- `fill-none` | — | Button SVG outline paths (NOT documented)
- `group-disabled/button:fill-secondary-300` | — | Button disabled SVG (NOT documented)
- `group-disabled/button:stroke-secondary-300` | — | Button disabled SVG (NOT documented)

### Gradients — missing
- Admin sidebar active gradient: `from-info/30 to-transparent` (NOT documented)

### Token description update
- `--color-info` usage should mention admin dashboard borders/bg/shadows

## Implementation Steps
- [✅] Step 1: Added `bg-light/20 | dark:bg-slate-900/20` and `bg-light/10 | dark:bg-slate-900/10` to Backgrounds table
- [✅] Step 2: Added `bg-info/30` to Backgrounds table
- [✅] Step 3: Added `border-info/20`, `border-info/30`, `border-info/50` to Borders table
- [✅] Step 4: Added `shadow-info/10` to Shadows table
- [✅] Step 5: Added button SVG fill/stroke pairs (fill-dark, stroke-dark, hover, disabled) to Fills & Strokes table
- [✅] Step 6: Added admin sidebar gradient `from-info/30 to-transparent` with RTL variant
- [✅] Step 7: Updated `--color-info` token description to include admin dashboard usage
- [✅] Step 8: Run pnpm run type:check — 0 errors
- [✅] Step 9: Run pnpm run test — 190 passed

## Verification
- [✅] pnpm run type:check — 0 errors
- [✅] pnpm run test — 190 passed
