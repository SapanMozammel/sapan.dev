# Architecture — Routing & i18n

## Route Structure

| URL | File | Type | Component |
|---|---|---|---|
| `/` | `src/app/[locale]/(landing)/page.tsx` | Home (no URL segment) | Server |
| `/articles` | `src/app/[locale]/articles/page.tsx` | Articles listing (pagination + category filter) | Client |
| `/articles/[slug]` | `src/app/[locale]/articles/[slug]/page.tsx` | Article detail | Server |

## Layout Hierarchy

```
src/app/layout.tsx              # Root — bare fragment (<>{children}</>) + global.scss import
src/app/[locale]/layout.tsx     # Locale — html, body, fonts, RTL dir, NextIntlClientProvider,
                                #   Providers (Redux + Theme), Header, Footer, metadata
src/app/[locale]/(landing)/page.tsx
```

- Root layout is a bare fragment — only imports `global.scss`, renders `<>{children}</>`
- Locale layout handles everything: `<html lang>`, `<body>` with fonts, `dir="rtl"` for Arabic, `NextIntlClientProvider`, `Providers` (Redux + Theme), Header, Footer, noise overlay

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
// ✓ internal routes — locale-aware
import { Link, useRouter, usePathname } from '@/i18n/navigation'

// ✓ external links (https://, mailto:, tel:) — no locale prefix needed
import NextLink from 'next/link'

// ✓ both can coexist — for components with mixed links (e.g. Button with dynamic `to` prop)
import { Link } from '@/i18n/navigation'
import NextLink from 'next/link'

const isExternal = to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:')
const LinkComponent = isExternal ? NextLink : Link

// ✗ wrong — unaliased next/link for internal routes
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
