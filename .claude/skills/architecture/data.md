# Architecture — Data & Types

## src/data/content/

Static content files — imported directly by Server Components.

| File | Exports |
|---|---|
| `admin-dashboard.tsx` | `menuItems`, `inboxList` — Hero admin screen mock data (uses `.tsx` for JSX icons) |
| `blogs.ts` | `BLOG_POSTS`, `FEATURED_BLOGS`, `BLOGS_PER_PAGE`, `CATEGORY_COLORS`, `DEFAULT_CATEGORY_COLOR` |
| `experience.ts` | `EXPERIENCE_DATA` — work history array |
| `faq.ts` | `FAQ_DATA` — accordion items array |
| `portfolio.tsx` | `PORTFOLIO_PROJECTS` — project cards (uses `.tsx` for JSX icons) |
| `testimonials.ts` | `TESTIMONIAL_LIST` — testimonial items array |
| `workflow.ts` | `WORKFLOW_STEPS` — process steps array |

> `portfolio.tsx` uses `.tsx` extension because items include JSX (SVG icons inline). All others are `.ts`.

## src/data/config/

App-level configuration — imported by routing, i18n, and component logic.

| File | Exports |
|---|---|
| `languages.ts` | `LANGUAGES`, `LanguageCode`, `Language` — locale metadata (name, flag, RTL) |
| `technologies.ts` | `TECH_STACK` — tech stack grid items |

## src/types/

TypeScript type definitions — one file per domain.

| File | Types |
|---|---|
| `blog.ts` | `ContentBlock`, `BlogPost`, `BlogCardProps` |
| `button.ts` | `BaseButtonProps`, `LinkButtonProps`, `RegularButtonProps`, `ButtonProps`, `ConnectButtonProps`, `GradientStop`, `SvgShapeProps`, `CenterSvgProps`, `ButtonContentProps`, `ButtonVariantConfig` |
| `contact.ts` | `ContactFormData`, `ContactFormErrors`, `ContactSubmitStatus`, `ContactFormProps` |
| `cursor-tooltip.ts` | `CursorTooltipProps`, `Position`, `TooltipContentProps` |
| `diamond-grid.ts` | `DiamondGridItem`, `DiamondGridProps`, `LayoutConfig`, `ColumnGroup`, `DiamondColumnProps` |
| `error.ts` | `ErrorProps` |
| `experience.ts` | `ExperienceType`, `ExperienceItem`, `TimelineItemProps`, `TimelineProps`, `TimelineProgressBarProps` |
| `faq.ts` | `FaqItem`, `AccordionItemProps`, `AccordionProps` |
| `i18n.ts` | `Locale`, `LocaleState` |
| `marquee.ts` | `MarqueeProps` |
| `particles.ts` | `ParticleProps`, `ParticleBackgroundProps` |
| `portfolio.ts` | `PortfolioProject`, `ProjectCardProps` |
| `providers.ts` | `ProvidersProps` |
| `separator.ts` | `SeparatorTypes` |
| `stacking-cards.ts` | `UseStackingCardsOptions` |
| `technology.ts` | `TechStackItem`, `TechnologiesDisplayProps` |
| `testimonial.ts` | `TestimonialData` |
| `title.ts` | `SectionTitleTypes` |
| `badge.ts` | `BadgeProps` |
| `bullet-list.ts` | `BulletListProps` |
| `cta-link.ts` | `CTALinkProps` |
| `form-field.ts` | `FormFieldProps` |
| `meta-label.ts` | `MetaLabelProps` |
| `status-dot.ts` | `StatusDotProps` |
| `status-message.ts` | `StatusMessageProps` |
| `workflow.ts` | `WorkflowStep`, `WorkflowContentProps`, `WorkflowProgressProps` |

## src/lib/utils/

Pure utility functions.

| File | Exports |
|---|---|
| `index.ts` | `cn()` — clsx + extendTailwindMerge (with typography preset regex) |
| `image.ts` | `shimmer()`, `toBase64()`, `getBlurDataURL()`, `getSolidColorPlaceholder()`, `IMAGE_SIZES`, `getOptimizedImageProps()`, `TECH_LOGOS`, `getTechLogo()` |

## Data Flow

```
src/data/ (static files)
  ↓ import
Server Component (reads data, no fetch needed)
  ↓ props
Child Components (receive data as typed props)
```

No `fetch()`, no API calls for static content — it's all imported directly.

## Rules

- Use `type` (never `interface`) for all type definitions
- No `any` types — TypeScript strict mode enforced
- `portfolio.tsx` is the only data file that may contain JSX — all others must be `.ts`
- New data files go in `src/data/content/` (changing content) or `src/data/config/` (app config)
- New type files go in `src/types/` — one file per domain, named after the domain

---

## See also

For GraphQL data fetching conventions (RSC vs Client decision, fragment colocation, codegen flow, auth boundary), see [`data-graphql.md`](./data-graphql.md).

### External reference

Sapan rules in this file are authoritative; external references are framework-level guidance — load when sapan rules don't cover the case.

- [`external/typescript/typescript-expert/`](../external/typescript/typescript-expert/) — deep TS problem-solving for complex data type modeling
- [`external/data/apollo-client/`](../external/data/apollo-client/) — Apollo Client 4.x patterns. **Load only when Apollo is in use** (file imports from `src/lib/apollo/`). Once a real query ships, this skill is the deep reference.
