# Feature: Data Skill Audit

## Context
The data.md skill file has stale type names, missing exports, and incomplete documentation that doesn't match the actual codebase. Update it to reflect the current state accurately.

## Affected Files
- `.claude/skills/architecture/data.md` — stale type names and incomplete export listings
- `src/lib/utils/index.ts` — `cn()` uses function declaration instead of arrow function
- `src/types/diamond-grid.ts` — `[key: string]: any` violates no-any rule

## New Files
None

## Implementation Steps

### Round 1 — Fix wrong type names in data.md
- [✅] Step 1: Fix `image.ts` type name — `ImageProps` → `OptimizedImageProps`
- [✅] Step 2: Fix `particles.ts` type name — `ParticleConfig` → `ParticleProps`
- [✅] Step 3: Fix `separator.ts` type name — `SectionSeparatorProps` → `SeparatorTypes`
- [✅] Step 4: Fix `stacking-cards.ts` type name — `StackingCardsConfig` → `UseStackingCardsOptions`
- [✅] Step 5: Fix `title.ts` type name — `SectionTitleProps` → `SectionTitleTypes`
- [✅] Step 6: Fix `contact.ts` types — `ContactFormData, ContactStatus` → `ContactFormData, ContactFormErrors, ContactSubmitStatus, ContactFormProps`

### Round 1 — Update incomplete type listings in data.md
- [✅] Step 7: Update `blog.ts` — add `ContentBlock`, `BlogCardProps`
- [✅] Step 8: Update `button.ts` — add `ConnectButtonProps`, `GradientStop`, `SvgShapeProps`, `CenterSvgProps`, `ButtonContentProps`, `ButtonVariantConfig`
- [✅] Step 9: Update `cursor-tooltip.ts` — add `Position`, `TooltipContentProps`
- [✅] Step 10: Update `diamond-grid.ts` — add `DiamondGridItem`, `DiamondGridLegacyProps`, `DiamondGridFlexibleProps`, `LayoutConfig`, `ColumnGroup`, `DiamondColumnProps`, `LayoutConfigMap`
- [✅] Step 11: Update `experience.ts` — add `ExperienceType`, `TimelineItemProps`, `TimelineProps`, `TimelineProgressBarProps`
- [✅] Step 12: Update `faq.ts` — add `AccordionItemProps`, `AccordionProps`
- [✅] Step 13: Update `i18n.ts` — add `LocaleState`, `TranslationNamespace`
- [✅] Step 14: Update `image.ts` — add `AvatarImageProps`, `LogoImageProps`
- [✅] Step 15: Update `particles.ts` — add `ParticleBackgroundProps`
- [✅] Step 16: Update `portfolio.ts` — add `ProjectCardProps`
- [✅] Step 17: Update `technology.ts` — add `TechnologiesDisplayProps`
- [✅] Step 18: Update `workflow.ts` — add `WorkflowContentProps`, `WorkflowProgressProps`

### Round 1 — Update config and utils sections
- [✅] Step 19: Update `languages.ts` — add `LanguageCode`, `Language` type exports
- [✅] Step 20: Update `image.ts` utils — add `toBase64()`, `getSolidColorPlaceholder()`, `IMAGE_SIZES`, `getOptimizedImageProps()`, `TECH_LOGOS`, `getTechLogo()`

### Round 1 — Fix stale docs for empty/missing items
- [✅] Step 21: Fix `data.md` — remove `Messages` from `i18n.ts` types (doesn't exist in file)
- [✅] Step 22: Fix `data.md` — mark `date.ts`, `file.ts`, `string.ts` as empty placeholders in utils table (all 0 bytes)

### Round 1 — Fix code violations
- [✅] Step 23: Fix `src/types/diamond-grid.ts:7` — replaced `[key: string]: any` with `logo?: string`
- [✅] Step 24: Fix `src/lib/utils/index.ts` — converted `cn()` from function declaration to arrow function

### Round 1 — Finalize
- [✅] Step 25: Run pnpm run format:all — 0 errors
- [✅] Step 26: Run pnpm run type:check — 0 errors
- [✅] Step 27: Run pnpm run test — 190 passed

## Verification
- [✅] pnpm run type:check — 0 errors
- [✅] pnpm run test — 190 passed
