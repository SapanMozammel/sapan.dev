# Design System — Spacing & Layout

## Container Utilities

```scss
.container        // mx-auto max-w-full px-6 md:max-w-[80%] md:px-0 2xl:max-w-[90rem]
.container-fluid  // mx-auto max-w-full px-6 md:px-10
```

- Use `.container` for all landing page sections
- Use `.container-fluid` for full-bleed sections that need more horizontal breathing room

## Section Spacing

| Role | Classes |
|---|---|
| Section vertical padding | `pb-8 sm:pb-12 lg:pb-16` |
| Section title area padding | `py-6 sm:py-10` |
| Content gaps | `gap-4 sm:gap-5` |

Every section wraps content in:
```tsx
<div className="container flex w-full grow flex-col">
```

## Card & Component Padding

| Context | Pattern |
|---|---|
| Cards | `p-4 sm:p-6` |
| Icon containers | `p-2` or `p-3` |
| Buttons | handled by Button component variants |
| Form inputs | `px-4 py-2.5` |

## Responsive Breakpoints (Tailwind defaults)

| Token | Width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

**Rules:**
- Always mobile-first — write the base (mobile) style first, then add `sm:` / `md:` / `lg:` overrides
- Never use arbitrary values for spacing when a Tailwind scale value exists
- Use `container` or `container-fluid` for section widths — never set `max-w-*` manually on sections
