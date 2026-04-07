# Design System — Typography

## Font Families

| Class | Font | Weight | Use for |
|---|---|---|---|
| `font-dm` | DM Sans | 300, 400 | Body copy, UI labels, default text |
| `font-hg` | Hanken Grotesk | 500, 700 | Nav, buttons, badges, hero subtext |
| `font-cg` | Cormorant Garamond | 500, 700 | Section titles, CTAs, display headings |
| `font-bungee` | Bungee | 400 | Logo + brand watermark only |
| `font-arabic` | Noto Sans Arabic | 400 | RTL content (Arabic locale only) |

**Rules:**
- Never inherit font silently — always apply an explicit font class
- Never introduce new font families — use only the five above
- `font-bungee` is logo/brand only — do not use for UI text

## Role Assignments

| UI Element | Font class |
|---|---|
| Page body, paragraphs, labels | `font-dm` |
| Navigation links | `font-hg` |
| Buttons, badges, chips | `font-hg` |
| Section titles (`SectionTitle title`) | `font-cg` |
| CTAs, display headings | `font-cg` |
| SectionTitle watermark | `font-cg` (low opacity) |
| Logo, brand mark | `font-bungee` |
| Arabic locale text | `font-arabic` |

## Text Sizing Scale (mobile-first)

| Role | Classes |
|---|---|
| Body | `text-sm sm:text-base` |
| Subtitles / meta | `text-xs sm:text-sm` |
| Section titles | `text-3xl sm:text-5xl` |
| Hero headings | `text-xl sm:text-4xl lg:text-5xl` |
| Watermarks | `text-5xl sm:text-7xl` |

Always use mobile-first breakpoints (`sm:`, `md:`, `lg:`) — no bare large sizes without a smaller default.
