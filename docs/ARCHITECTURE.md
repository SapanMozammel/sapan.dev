# Architecture

## Overview

Next.js 15 portfolio/marketing website using App Router, TypeScript, Tailwind CSS v4, and SCSS.

## Folder Structure

```
src/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout (global SCSS imports)
│   ├── [locale]/                     # i18n dynamic segment
│   │   ├── layout.tsx                # Locale layout (Providers, Header, Footer)
│   │   ├── (landing)/page.tsx        # Home page
│   │   ├── blog/page.tsx             # Blog listing
│   │   └── blog/[slug]/page.tsx      # Blog post
│
├── components/
│   ├── layout/                       # Page sections (each has index.tsx)
│   │   ├── Hero/                     # Hero section
│   │   │   ├── index.tsx             # Main component
│   │   │   ├── AdminScreen.tsx       # Email dashboard showcase
│   │   │   ├── HeroBackground.tsx    # Background decoration
│   │   │   └── admin/               # AdminScreen sub-components
│   │   │       ├── AdminSidebar.tsx
│   │   │       ├── AdminEmailList.tsx
│   │   │       ├── AdminEmailPreview.tsx
│   │   │       ├── AdminDecorations.tsx
│   │   │       ├── AdminTravelCard.tsx
│   │   │       ├── AdminPerformanceCircle.tsx
│   │   │       ├── AdminHalfWaveCircle.tsx
│   │   │       └── data.tsx
│   │   ├── Experience/               # Timeline section
│   │   │   ├── index.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   └── particles/           # Three.js particle system
│   │   ├── Portfolio/                # Stacking card projects
│   │   ├── Technologies/             # Tech stack grid
│   │   ├── Testimonials/             # Marquee testimonials
│   │   ├── Workflow/                 # Animated workflow steps
│   │   │   ├── index.tsx
│   │   │   ├── WorkflowContent.tsx
│   │   │   └── WorkflowProgress.tsx
│   │   ├── Blog/                     # Blog cards section
│   │   ├── Faq/                      # Accordion FAQ
│   │   ├── Cta/                      # Call-to-action
│   │   │   ├── index.tsx
│   │   │   └── CtaBackground.tsx
│   │   ├── Header/                   # Navigation header
│   │   ├── Footer/                   # Site footer
│   │   └── common/                   # Shared layout components
│   │       ├── Button.tsx            # Custom shaped button
│   │       ├── Button/              # Button sub-components
│   │       │   ├── ButtonContent.tsx
│   │       │   ├── ButtonShapeSvg.tsx
│   │       │   └── variants.ts      # 8 static variant configs
│   │       ├── ConnectButton.tsx
│   │       ├── SectionSeparator.tsx
│   │       ├── SectionTitle.tsx
│   │       ├── TextUnderline.tsx
│   │       ├── ThemeSwitcher.tsx
│   │       └── LanguageSwitcher.tsx
│   ├── ui/                           # Base UI components
│   │   ├── accordion.tsx
│   │   ├── blog-card.tsx
│   │   ├── contact-modal/           # Contact form modal
│   │   │   ├── index.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── ContactStatusStates.tsx
│   │   ├── timeline/                # Experience timeline
│   │   │   ├── index.tsx
│   │   │   ├── TimelineItem.tsx
│   │   │   ├── TimelineProgressBar.tsx
│   │   │   └── timeline-utils.ts
│   │   ├── diamond-grid.tsx
│   │   ├── gsap-marquee.tsx
│   │   ├── project-card.tsx
│   │   ├── technologies-display.tsx
│   │   ├── cursor-tooltip.tsx
│   │   ├── dialog.tsx
│   │   ├── popover.tsx
│   │   └── tooltip.tsx
│   └── icons/                        # Custom SVG icons
│       ├── Logo.tsx
│       ├── Cloud.tsx
│       ├── Pattern.tsx
│       └── WorldMap.tsx
│
├── data/                             # Static content and config
│   ├── config/                       # App configuration
│   │   ├── languages.ts
│   │   ├── routes.ts
│   │   └── technologies.ts
│   ├── content/                      # Site content
│   │   ├── experience.ts
│   │   ├── portfolio.tsx
│   │   ├── testimonials.ts
│   │   ├── workflow.ts
│   │   ├── faq.ts
│   │   └── blogs.ts
│   └── index.ts
│
├── hooks/                            # Custom React hooks
│   ├── useContactForm.ts
│   └── useStackingCards.ts
│
├── store/                            # Redux Toolkit
│   ├── index.ts                      # Store configuration
│   ├── hooks/index.ts                # Typed useAppDispatch/useAppSelector
│   └── slices/
│       ├── localeSlice.ts            # Locale + RTL detection
│       └── uiSlice.ts               # Contact modal state
│
├── lib/                              # Utilities
│   ├── utils/
│   │   ├── index.ts                  # cn() (clsx + tailwind-merge)
│   │   ├── image.ts                  # Image helpers, shimmer, blur
│   │   ├── date.ts
│   │   ├── file.ts
│   │   └── string.ts
│   └── helper.ts
│
├── styles/                           # SCSS
│   ├── global.scss                   # Tailwind imports + partials
│   ├── themes.scss                   # CSS variables (light/dark)
│   ├── animations.scss               # Keyframes
│   ├── components.scss
│   └── utilities.scss
│
├── types/                            # TypeScript types
├── i18n/                             # Internationalization (next-intl)
├── providers/index.tsx               # Theme + Redux providers
│
└── __tests__/                        # Unit tests (Vitest)
    ├── setup.tsx
    ├── test-utils.tsx
    ├── components/
    ├── data/
    ├── lib/
    ├── store/
    └── ui/
```

## Server vs Client Components

| Type | Rules |
|---|---|
| **Server** | No `'use client'`, no hooks/state, no `memo()`. Arrow functions. |
| **Client** | `'use client'` at top. `memo()` where beneficial. Hooks allowed. |

Server Components: Hero, Experience, Blog, Faq, Cta, Footer, Header, SectionTitle, SectionSeparator, TextUnderline, HeroBackground, CtaBackground, AdminScreen

Client Components: Technologies, Portfolio, Testimonials, Workflow, Button, ConnectButton, LanguageSwitcher, ThemeSwitcher, Accordion, Timeline, ContactModal

## Styling

- **Tailwind CSS v4** configured via `@tailwindcss/postcss` (no `tailwind.config.js` -- config lives in CSS `@theme`)
- **SCSS** for global styles, themes, animations
- **`cn()`** utility (clsx + tailwind-merge) for conditional class names
- **Design tokens**: `--color-primary`, `--color-success`, `--color-info`, `--color-danger`
- **Dark mode**: `dark:` variant with design system colors

## State Management

Redux Toolkit with two slices:
- **`localeSlice`** -- current locale, RTL detection, localStorage persistence
- **`uiSlice`** -- contact modal open/close

Page content reads from `src/data/` constants, not Redux.

## Path Aliases

`@/*` maps to `src/*` in both `tsconfig.json` and `vitest.config.ts`.
