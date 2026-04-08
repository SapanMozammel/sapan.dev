# Architecture — Data & Types

## src/data/content/

Static content files — imported directly by Server Components.

| File | Exports |
|---|---|
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
| `languages.ts` | `LANGUAGES` — locale metadata (name, flag, RTL) |
| `routes.ts` | (empty — placeholder) |
| `technologies.ts` | `TECH_STACK` — tech stack grid items |

## src/types/

TypeScript type definitions — one file per domain.

| File | Types |
|---|---|
| `blog.ts` | `BlogPost` |
| `button.ts` | `ButtonVariant`, `ButtonProps` |
| `contact.ts` | `ContactFormData`, `ContactStatus` |
| `cursor-tooltip.ts` | `CursorTooltipProps` |
| `diamond-grid.ts` | `DiamondGridProps` |
| `error.ts` | `ErrorProps` |
| `experience.ts` | `ExperienceItem` |
| `faq.ts` | `FaqItem` |
| `i18n.ts` | `Locale`, `Messages` |
| `image.ts` | `ImageProps` |
| `marquee.ts` | `MarqueeProps` |
| `particles.ts` | `ParticleConfig` |
| `portfolio.ts` | `PortfolioProject` |
| `providers.ts` | `ProvidersProps` |
| `separator.ts` | `SectionSeparatorProps` |
| `stacking-cards.ts` | `StackingCardsConfig` |
| `technology.ts` | `TechStackItem` |
| `testimonial.ts` | `TestimonialData` |
| `title.ts` | `SectionTitleProps` |
| `workflow.ts` | `WorkflowStep` |

## src/lib/utils/

Pure utility functions.

| File | Exports |
|---|---|
| `index.ts` | `cn()` — clsx + tailwind-merge |
| `image.ts` | `getBlurDataURL()`, `shimmer()` |
| `date.ts` | Date formatting helpers |
| `file.ts` | File utility helpers |
| `string.ts` | String utility helpers |

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
