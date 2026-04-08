# Architecture — Routing & i18n

## Route Structure

| URL | File | Type |
|---|---|---|
| `/` | `src/app/[locale]/(landing)/page.tsx` | Home (no URL segment) |
| `/articles` | `src/app/[locale]/articles/page.tsx` | Articles listing |
| `/articles/[slug]` | `src/app/[locale]/articles/[slug]/page.tsx` | Article detail |

## Layout Hierarchy

```
src/app/layout.tsx              # Root — html/body + fonts only
src/app/[locale]/layout.tsx     # Locale — Providers, Header, Footer, RTL dir
src/app/[locale]/(landing)/page.tsx
```

- Root layout sets `<html>` and `<body>` with font variables only
- Locale layout handles: Redux + Theme providers, Header, Footer, `dir="rtl"` for Arabic

## i18n — next-intl v4

**16 locales:** `en` (default) · `fr` · `de` · `es` · `ar` · `zh-CN` · `pt-BR` · `ja` · `nl` · `it` · `ru` · `hi` · `no` · `tr` · `ko` · `bn`

**Prefix strategy:** `localePrefix: 'as-needed'`
- English → no prefix: `sapan.dev/`
- All others → prefixed: `sapan.dev/fr/`, `sapan.dev/ar/`

**Translation file structure:**
```
src/i18n/locales/
├── en/                     # Baseline — always complete
│   ├── common.json
│   ├── navigation.json
│   ├── home.json
│   └── blog.json
└── [fr|de|es|ar|...]/      # Partial — missing keys fall back to en
```

**4 namespaces:** `common` · `navigation` · `home` · `blog`

**Locale detection priority:**
1. URL segment (e.g. `/fr/`)
2. `localStorage` key `preferred-language`
3. `Accept-Language` header
4. Falls back to `en`

**Graceful fallback:** Missing namespace files in non-English locales fall back to English automatically.

## Navigation Imports

**Always** import from `@/i18n/navigation` — **never** from `next/navigation`:

```tsx
// ✓ correct
import { Link, useRouter, usePathname } from '@/i18n/navigation'

// ✗ wrong
import { useRouter } from 'next/navigation'
import Link from 'next/link'
```

## RTL Support (Arabic)

- `[locale]/layout.tsx` sets `dir="rtl"` when locale is `ar`
- Use `rtl:` Tailwind variant for RTL-specific overrides in components:

```tsx
<div className="ml-4 rtl:ml-0 rtl:mr-4">
```

## Static Generation

All routes use `generateStaticParams()` to pre-render all locale variants at build time:

```tsx
export const generateStaticParams = () =>
  locales.map((locale) => ({ locale }))
```
