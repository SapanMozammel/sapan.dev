# Design System Reference — sapan.dev

You are working on the sapan.dev portfolio site. When the user asks you to create, modify, or review any UI — follow this design system strictly.

## Color Tokens

### Semantic Colors (always prefer these)
| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#4a4ded` | Light-mode accent: text, bg, border, ring, fill, shadow, gradients, CTA rays |
| `--color-success` | `#43ead4` | Dark-mode accent (mirrors primary): text, bg, border, ring, fill, shadow, gradients |
| `--color-info` | `#1f8fff` | Admin UI borders/bg, hero radial glow, brand gradient end, SVG strokes/fills |
| `--color-warning` | `#ff6f00` | Unused in components (reserved for warning states) |
| `--color-danger` | `#f56565` | Form validation errors (text + border), testimonial blur bg, error icon bg |
| `--color-white` | `#ffffff` | Light-mode text on accent, bg surfaces, ring, overlay glass, admin glass |
| `--color-black` | `#0e0c15` | Dark-mode bg surfaces, shadow colors, image overlays, overlay glass |
| `--color-light` | `#ecf1f4` | Light-mode surface buttons, admin glass bg, contact modal bg, dark hamburger lines |
| `--color-dark` | `#0e0e2c` | Light-mode primary text/headings, dark-mode contact modal bg, dark-mode tooltips text |

### Secondary Scale (neutral grays)
`--color-secondary` (#f1f5f9) through `--color-secondary-900` (#0f172a)

Key stops: `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`

### Primitive Palettes
22 color families available (slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose) — each with shades 25–950 + a100.

**Rule:** Use semantic tokens first. Only fall back to primitives when semantic tokens don't fit.

---

## Dark Mode

- Controlled via `next-themes` with class strategy (`.dark` on `<html>`)
- Custom variant: `@custom-variant dark (&:where(.dark, .dark *));`
- Pattern: always write light-mode default, then `dark:` override

### Core Color Swap Pattern
```
text-primary dark:text-success
bg-primary/10 dark:bg-success/10
border-primary dark:border-success
```

### Common Dark Mode Pairs

**Backgrounds:**
| Light | Dark | Context |
|---|---|---|
| | **Base surfaces** | |
| `bg-white` | `dark:bg-black` | Page body, cards, blog cards, containers, workflow, popover |
| `bg-white/95` | `dark:bg-black/95` | Mobile nav sheet with backdrop-blur |
| `bg-white/50` | `dark:bg-black/50` | Testimonial cards, admin sidebar, sheet overlay |
| `bg-white/30` | `dark:bg-black/30` | Admin inner panels |
| `bg-secondary` | `dark:bg-secondary-900` | Accordion items |
| `bg-secondary` | `dark:bg-dark` | Contact modal |
| | **Surface accents** | |
| `bg-light` | `dark:bg-slate-900` | Hamburger button, social link buttons, sheet base |
| `bg-light/20` | `dark:bg-slate-900/20` | Admin dashboard panel |
| `bg-light/70` | `dark:bg-slate-900/70` | Hero decorative circles |
| `bg-light/10` | `dark:bg-slate-900/10` | Admin travel card |
| `bg-black` | `dark:bg-white` | Hamburger lines |
| | **Secondary scale** | |
| `bg-secondary-600/5` | `dark:bg-secondary-400/5` | Nav icon wraps (inactive) |
| `bg-secondary-100` | `dark:bg-secondary-800` | Tags, chips, category default, timeline progress track |
| `bg-secondary-200` | `dark:bg-secondary-700` | Timeline dots, workflow progress track, article dot separators |
| | **Primary → Success** | |
| `bg-primary` | `dark:bg-success` | Active states, progress bar, availability dot, tooltips |
| `bg-primary/80` | `dark:bg-success/80` | Cursor tooltip, project card badge |
| `bg-primary/10` | `dark:bg-success/10` | Soft accent fills, icon containers, switchers |
| `bg-primary/5` | `dark:bg-success/5` | Nav active, workflow icon outer |
| `bg-danger` | `dark:bg-success` | Testimonial decorative blur |
| | **Per-color primitives** | |
| `bg-{color}-50` | `dark:bg-{color}-950` | Blog category badges (sky, blue, violet, green, orange, cyan) |
| `bg-{color}-25/90` | `dark:bg-{color}-a100/90` | Portfolio card backgrounds |
| `bg-{color}-50/50` | `dark:bg-{color}-950/50` | Article callout backgrounds |
| | **Pseudo-element bg** | |
| `before:bg-primary` | `dark:before:bg-success` | Article list bullet dots, accordion toggle line |
| `after:bg-primary` | `dark:after:bg-success` | Accordion toggle line, inbox unread dot |
| | **Fixed (no light/dark swap)** | |
| `bg-secondary-800` | — | Code block header (both modes) |
| `bg-secondary-900` | — | Code block body (both modes) |

**Text:**
| Light | Dark | Context |
|---|---|---|
| | **Core text** | |
| `text-dark` | `dark:text-white` | Headings, section titles, card titles, accordion questions, icons |
| `text-dark/70` | `dark:text-white/70` | Admin decorative circle numbers |
| `text-white` | `dark:text-dark` | On accent backgrounds (primary/success), tooltips, badges |
| | **Primary → Success** | |
| `text-primary` | `dark:text-success` | Accent text, active nav, icons, links, progress, stars |
| `text-primary/50` | `dark:text-success/50` | Subtle accent numbering (mobile nav) |
| | **Secondary scale** (light→dark: lower number = lighter dark variant) | |
| `text-secondary-100/50` | `dark:text-secondary-800/50` | Watermark text (SectionTitle) |
| `text-secondary-100` | `dark:text-secondary-800` | Timeline SVG progress track (currentColor stroke) |
| `text-secondary-400` | `dark:text-secondary-600` | Muted meta: nav numbering, admin icons, bg lines, timestamps |
| `text-secondary-500` | `dark:text-secondary-500` | Mid-tone: labels, form labels, subtitles |
| `text-secondary-600` | `dark:text-secondary-400` | Body text: descriptions, FAQ, excerpts, footer, timeline, lists, nav inactive |
| `text-secondary-700` | `dark:text-secondary-300` | Rich text: hero pattern, article paragraphs, list items |
| | **Per-color primitives** | |
| `text-{color}-700` | `dark:text-{color}-300` | Blog category badge text (sky, blue, violet, green, orange, cyan) |
| `text-{color}-600` | `dark:text-{color}-400` | Article callout icons (blue, orange, green) |
| | **Shadcn (Sheet)** | |
| `text-dark` | `dark:text-white` | Sheet title |
| `text-secondary-500` | `dark:text-secondary-500` | Sheet description |
| | **Placeholder text** | |
| `placeholder:text-secondary-600/50` | `dark:placeholder:text-secondary-400/50` | Form input placeholders |

**Hover:**
| Light | Dark | Context |
|---|---|---|
| | **Backgrounds** | |
| `hover:bg-secondary/50` | `dark:hover:bg-secondary-900/50` | Nav item backgrounds |
| `hover:bg-primary` | `dark:hover:bg-success` | Social link buttons (footer) |
| | **Text** | |
| `hover:text-primary` | `dark:hover:text-success` | Nav links, interactive text |
| `hover:text-dark` | `dark:hover:text-white` | Neutral hover text |
| | **Borders** | |
| `hover:border-primary` | `dark:hover:border-success` | Pagination, interactive borders |
| `hover:border-secondary-400` | `dark:hover:border-secondary-600` | Category filter borders (articles) |
| | **Shadows** | |
| `hover:shadow-black/5` | `dark:hover:shadow-white/5` | Blog card hover shadow (dark only) |

**Group Hover:**
| Light | Dark | Context |
|---|---|---|
| `group-hover:bg-secondary-200` | `dark:group-hover:bg-secondary-700` | Grouped hover fills |
| `group-hover:text-primary` | `dark:group-hover:text-success` | Grouped hover accent text |
| `group-hover:text-white` | `dark:group-hover:text-dark` | Social icon hover on accent bg |

**Borders:**
| Light | Dark | Context |
|---|---|---|
| | **Secondary scale** | |
| `border-secondary-100` | `dark:border-secondary-800` | Inner dividers |
| `border-secondary-200` | `dark:border-secondary-700` | Dividers, sheet/panel borders, form inputs |
| `border-secondary-200/50` | `dark:border-secondary-700/50` | Cards, containers |
| `border-secondary-300` | `dark:border-secondary-700` | Pagination, interactive, timeline dots |
| `border-secondary-400` | `dark:border-secondary-600` | Section lines, header, footer |
| | **Primary → Success** | |
| `border-primary` | `dark:border-success` | Accent borders, tooltips |
| `border-primary/10` | `dark:border-success/10` | Subtle accent containers |
| `border-primary/50` | `dark:border-success/50` | Icon containers |
| | **Other** | |
| `border-danger` | `dark:border-danger` | Form validation error (same both modes) |
| `border-{color}-100` | `dark:border-{color}-900` | Portfolio card borders (sky, blue, violet, etc.) |
| `border-{color}-400/50` | `dark:border-{color}-600/50` | Article callout borders (blue, orange, green) |
| | **Focus** | |
| `focus:border-primary` | `dark:focus:border-success` | Form input focus state |
| | **Dividers** | |
| `divide-secondary-400` | `dark:divide-secondary-600` | Popover/switcher section dividers |

// FIXME:

**Shadows:**
| Light | Dark | Context |
|---|---|---|
| `shadow-black/5` | `dark:shadow-black/20` | Cards, containers |
| `shadow-dark/5` | `dark:shadow-white/5` | Project cards |
| `shadow-secondary-300/10` | `dark:shadow-dark/10` | Tech grid, article cards |
| `shadow-primary/10` | `dark:shadow-success/10` | Workflow accent |

**Rings:**
| Light | Dark | Context |
|---|---|---|
| `ring-white` | `dark:ring-secondary-900` | Timeline dots |
| `ring-primary/90` | `dark:ring-success/20` | Active timeline dots |
| — | `dark:ring-secondary-700/40` | Accordion active border ring (dark only) |

**Misc:**
| Light | Dark | Context |
|---|---|---|
| `opacity-5` | `dark:opacity-15` | Noise texture overlay |
| `brightness-5` | `dark:invert` | Tech logo images (light→dark inversion) |
| — | `dark:disabled:brightness-90` | Button disabled state (dark only) |

---

## Typography

### Font Families
| Class | Font | Usage |
|---|---|---|
| `font-dm` | DM Sans (300, 400) | Default body text |
| `font-sora` | Sora (400–700) | UI text, subtitles |
| `font-cg` | Cormorant Garamond (500, 700) | Section titles, CTAs |
| `font-eb` | EB Garamond (500, 700) | Watermarks |
| `font-hg` | Hanken Grotesk (500, 700) | Hero headings |
| `font-bungee` | Bungee (400) | Logo, brand text |
| `font-arabic` | Noto Sans Arabic (400) | Arabic RTL content |

### Text Sizing Pattern (mobile-first)
- Body: `text-sm sm:text-base`
- Subtitles: `text-xs sm:text-sm`
- Section titles: `text-3xl sm:text-5xl`
- Hero headings: `text-xl sm:text-4xl lg:text-5xl`
- Watermarks: `text-5xl sm:text-7xl`

---

## Spacing & Layout

### Container Utilities
```scss
.container       // mx-auto max-w-full px-6 md:max-w-[80%] md:px-0 2xl:max-w-[90rem]
.container-fluid // mx-auto max-w-full px-6 md:px-10
```

### Section Spacing
- Section vertical padding: `pb-8 sm:pb-12 lg:pb-16`
- Inner title padding: `py-6 sm:py-10`
- Content gaps: `gap-4 sm:gap-5`

### Responsive Breakpoints (Tailwind defaults)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## Component Patterns

### Server vs Client Components
- **Server Components**: No `'use client'`, no `memo()`, no hooks. Use arrow functions. Export default.
- **Client Components**: `'use client'` at top. Wrap with `memo()`. Use hooks as needed.
- Server CAN import Client. Client CANNOT import Server.

### cn() Utility — Always Use for ClassNames
```typescript
import { cn } from '@/lib/utils';
// Usage: cn(BASE_CLASSES, conditional && 'extra-classes', className)
```

### Border Pattern
```
border border-solid border-secondary-300/50 dark:border-secondary-700/50
```

### Shadow Pattern
```
shadow-lg shadow-black/5 dark:shadow-black/20
```

### Hover Pattern
```
hover:-translate-y-1 hover:shadow-lg transition-all duration-300
```

### Active/Selected State
```
bg-primary/10 text-primary dark:bg-success/10 dark:text-success
```

### Focus State (Form Inputs)
```
focus:border-primary dark:focus:border-success focus:outline-none
```

### Error State
```
border-danger text-danger
```

### Disabled State
```
opacity-50 cursor-not-allowed
```

---

## Button System

Located at `src/components/layout/common/Button.tsx` with variants in `Button/variants.ts`.

### Props
- `fill`: boolean — filled vs outlined
- `gradient`: boolean — gradient vs solid
- `loading`: boolean — loading spinner
- `to`: string — renders as Link instead of button

### 8 Variants
1. `link-fill-gradient` — Gradient-filled link
2. `link-fill-solid` — Solid-filled link
3. `link-outline-gradient` — Gradient-outlined link
4. `link-outline-solid` — Solid-outlined link
5. `button-fill-gradient` — Gradient-filled button
6. `button-fill-solid` — Solid-filled button
7. `button-outline-gradient` — Gradient-outlined button
8. `button-outline-solid` — Solid-outlined button

### Gradient Stops
- Light: `var(--color-info)` → `var(--color-primary)`
- Dark: `var(--color-primary)` → `var(--color-success)`

---

## Section Structure

Every major section follows this pattern:

```tsx
<SectionSeparator lts rts lbs rbs bl ll rl>
  <div className="container flex w-full grow flex-col">
    <SectionTitle
      title="Section Title"
      subtitle="SECTION SUBTITLE"
      watermark="Watermark"
    />
    {/* Section content */}
  </div>
</SectionSeparator>
```

### SectionSeparator Props (decorative corners/edges)
- `lts`/`rts`/`lbs`/`rbs` — Left/Right Top/Bottom Stars (IconPlus corners)
- `tl`/`bl`/`ll`/`rl` — Top/Bottom/Left/Right Lines

### SectionTitle Props
- `title`: Main heading (font-cg)
- `subtitle`: Small caps label (font-sora, secondary color)
- `watermark`: Large background text (font-eb, very low opacity)

---

## Animations

### CSS Keyframe Animations (Tailwind classes)
| Class | Duration | Use |
|---|---|---|
| `animate-noise` | 1s infinite | Background texture |
| `animate-spin-slow` | 10s infinite | Slow rotation |
| `animate-faq-border-shift` | 3s infinite | Gradient border shift |
| `animate-overlay-in` | 0.3s forwards | Modal fade in |
| `animate-overlay-out` | 0.3s forwards | Modal fade out |
| `animate-slide-in-from-{direction}` | 0.3s forwards | Slide in |
| `animate-slide-out-to-{direction}` | 0.3s forwards | Slide out |

### Transition Durations
- Micro: `duration-150` (hover color changes)
- Fast: `duration-200` (button states)
- Medium: `duration-300` (card hover, layout shifts)
- Slow: `duration-500` (section reveals)
- Very slow: `duration-800` (page transitions)

### Animation Libraries
- **Framer Motion**: Layout transitions, controlled animations, AnimatePresence
- **GSAP**: Marquee, proximity-based effects, timeline animations
- **Three.js / @react-three/fiber**: WebGL particle systems
- **CSS keyframes**: Infinite loops (noise, rays, dots)

---

## Gradients

### Brand Text Gradient (Logo/Header/Footer)
```
from-primary to-info dark:from-success
bg-gradient-to-r bg-clip-text text-transparent
```

### Hero Heading Gradient (radial)
```
bg-radial from-slate-400 via-slate-900 via-45% to-slate-600 to-75%
dark:from-slate-600 dark:via-light dark:to-slate-400
bg-clip-text text-transparent
```

### Background Gradient (Tech grid items)
```
bg-gradient-to-b from-secondary-200/50 to-secondary/50
dark:from-secondary-700/50 dark:to-secondary-900/50
```

### Hero Background Radial (decorative)
```
bg-radial from-info/50 via-info/15 via-40% to-transparent to-60%
```

### CTA Rays (decorative, dark section — no dark: variants)
```
bg-gradient-to-b from-primary/20 to-transparent   (solid rays)
bg-gradient-to-b from-primary/5 to-transparent     (blurred rays)
bg-gradient-to-b from-primary/10 to-transparent    (top overlay)
```

### Image Overlay Gradient (fixed, both modes)
```
bg-gradient-to-t from-black/30 to-transparent            (blog card)
bg-gradient-to-t from-black/60 via-black/10 to-transparent (article hero)
```

### Admin Sidebar Active (info accent)
```
from-info/30 to-transparent bg-gradient-to-r
rtl: from-transparent to-info/30
```

### SVG Gradient (TextUnderline, Logo)
Stops: `--color-info` → `--color-success`

---

## Fills & Strokes

| Light | Dark | Context |
|---|---|---|
| `fill-primary` | `dark:fill-success` | Tooltip arrow |
| `fill-secondary-100/50` | `dark:fill-secondary-800/50` | World map background (Hero) |
| `fill-info/80` | — | Performance circle text (both modes) |
| `stroke-info` | — | Performance circle ring (both modes) |

---

## Radix UI Wrappers (shadcn/ui)

Base components in `src/components/ui/`:
- **Dialog** — Modal windows (Radix Dialog)
- **Popover** — Dropdown menus (Radix Popover)
- **Tooltip** — Hover tooltips (Radix Tooltip)
- **Sheet** — Slide-out panels (Radix Dialog variant)

Style: `new-york` variant. Icons: `@tabler/icons-react`.

---

## Image Handling

### Blur Placeholder
```typescript
import { getBlurDataURL } from '@/lib/utils/image';
// <Image placeholder="blur" blurDataURL={getBlurDataURL()} />
```

### Remote Domains Allowed
- `cdn.simpleicons.org` — Tech logos
- `randomuser.me` — Avatar placeholders
- `images.unsplash.com` — Blog thumbnails

### Image Formats
WebP + AVIF with automatic format selection.

---

## File Organization Rules

| What | Where |
|---|---|
| Page sections | `src/components/layout/{SectionName}/index.tsx` |
| Sub-components | `src/components/layout/{SectionName}/{SubComponent}.tsx` |
| Shared layout pieces | `src/components/layout/common/` |
| Base UI (shadcn) | `src/components/ui/` |
| Custom icons | `src/components/icons/` |
| Static content | `src/data/content/` |
| App config | `src/data/config/` |
| Type definitions | `src/types/` |
| Utilities | `src/lib/utils/` |
| Styles | `src/styles/` |

---

## Checklist: Before Writing Any UI Code

1. Use `cn()` for all className composition
2. Include both light and dark mode styles
3. Use semantic color tokens (`primary`, `success`, `info`, `danger`)
4. Follow the primary → success dark-mode swap pattern
5. Use design system fonts (don't introduce new ones)
6. Use `container` or `container-fluid` utility for section widths
7. Apply consistent border/shadow patterns from this guide
8. Server Component by default; only add `'use client'` when hooks/state are required
9. Use `memo()` on client components
10. Use arrow function syntax for all components
11. Satisfy TypeScript strict mode (`noUnusedLocals`, `noUnusedParameters`, `exactOptionalPropertyTypes`)
12. Place types in `src/types/`, data in `src/data/`, utilities in `src/lib/`
