# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm run dev          # Start dev server on port 8000 with Turbopack
pnpm run dev:webpack  # Fallback dev server using webpack

# Build & Production
pnpm run build
pnpm run start

# Type checking & linting
pnpm run type:check   # tsc --noEmit
pnpm run lint         # ESLint
pnpm run lint:fix     # Auto-fix ESLint issues
pnpm run check:all    # type:check + lint + format:check

# Formatting
pnpm run format       # Prettier
pnpm run format:all   # imports:organize → format → lint:fix

# Cache reset (if dev server misbehaves)
rm -rf .next && pnpm run dev
```

## Architecture

This is a **Next.js 15 portfolio/marketing website** using the App Router, TypeScript, Tailwind CSS v4, and SCSS.

### Routing

- `src/app/(landing)/page.tsx` — Home page (route group, no URL segment)
- `src/app/blog/[slug]/page.tsx` and `src/app/portfolio/[slug]/page.tsx` — Dynamic routes
- `src/app/layout.tsx` — Root layout (wraps everything in `src/providers/index.tsx` which combines Redux + next-themes)

### Component Organization

- `src/components/layout/` — Page sections (Hero, Header, Footer, Portfolio, Experience, Technologies, Testimonials, Workflow). Each is a directory with `index.tsx`.
- `src/components/ui/` — shadcn/ui base components (new-york style, Tabler icons)
- `src/components/layout/common/` — Shared layout pieces: Button, SectionSeparator, TextUnderline, ThemeSwitcher
- `src/components/icons/` — Custom SVG icon components (Logo, Cloud, Pattern, WorldMap)

### Data / Content

All site content is static and lives in `src/lib/constants/`:
- `experience.ts` — `EXPERIENCE_DATA` array (job history)
- `technologies.ts` — `TECH_STACK` array (icons from simpleicons.org CDN)
- `portfolio.tsx` — Portfolio project items
- `testimonials.ts` — Testimonial data
- `routes.ts` — Navigation route definitions

Types for these are in `src/types/` (e.g., `experience.ts`, `technology.ts`, `portfolio.ts`).

### Styling

- **Tailwind CSS v4** is primary; configured via `@tailwindcss/postcss` (no `tailwind.config.js` — config is in CSS)
- **SCSS files** in `src/styles/`: `global.scss` imports Tailwind + the other partials; `themes.scss` defines CSS variables for light/dark; `animations.scss` for GSAP/CSS animations
- Use `cn()` from `src/lib/helper.ts` (wraps `clsx` + `tailwind-merge`) for conditional classNames
- shadcn/ui components are configured in `components.json` with path aliases

### Path Aliases

`@/*` maps to `src/*` — use this for all internal imports.

### State Management

Redux Toolkit store is in `src/store/` with a `userSlice` as an example. The store is provided via `src/providers/index.tsx`. Most page content does not use Redux — it reads directly from `src/lib/constants/`.

### TypeScript

Strict mode with `noUnusedLocals`, `noUnusedParameters`, and `exactOptionalPropertyTypes` enabled. All new code must satisfy these constraints.
