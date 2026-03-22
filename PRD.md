# Product Requirements Document (PRD)
## Multi-Language Support Implementation

**Project:** sapan.dev
**Feature:** Complete Internationalization (i18n) System
**Version:** 1.1
**Date:** 2026-03-22
**Status:** Phase 1 & 2 Complete — Phase 3 In Progress

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-11-18 | Initial PRD — Planning |
| 1.1 | 2026-03-22 | Phase 1 & 2 complete. Updated status, architecture, and phase checklists to reflect implementation. |

---

## 1. Executive Summary

Implement a comprehensive internationalization (i18n) system for sapan.dev to support multiple languages, enabling global reach and improved user experience for non-English speaking visitors. The system is built on `next-intl` v4 and integrates with Next.js 15's App Router.

### Key Requirements
- ✅ **Default Language**: English (`en`) — automatically selected on first visit
- ✅ **Storage**: Selected language stored in Redux store (runtime) + localStorage (persistence)
- ✅ **Storage Key**: `preferred-language` (consistent with current implementation)
- ✅ **Supported Languages**: 16 languages including RTL support for Arabic
- ⏳ **SEO**: Locale-based routing implemented; `hreflang` tags pending Phase 4

---

## 2. Background & Context

### Current State (as of v1.1)
- ✅ `next-intl` v4 installed and configured
- ✅ LanguageSwitcher connected to real locale routing (was UI-only before)
- ✅ Language selection synced to Redux store + localStorage (`preferred-language`)
- ✅ URL-based locale routing implemented (`/fr/about`, `/ar`, etc.)
- ✅ English baseline translation files for all 8 namespaces
- ✅ RTL layout support for Arabic via `dir` attribute
- ✅ Graceful fallback to English for untranslated locales
- ❌ Content translations for non-English locales (Phase 3)
- ❌ `hreflang` tags and sitemap (Phase 4)

### Supported Languages
The system supports 16 languages as defined in `src/lib/constants/languages.ts`:
1. English (US) - `en` ✅ translations complete
2. Français - `fr` ⏳ falls back to English
3. Deutsch - `de` ⏳ falls back to English
4. Español - `es` ⏳ falls back to English
5. العربية - `ar` ⏳ falls back to English (RTL layout ✅)
6. 中文 (简体) - `zh-CN` ⏳ falls back to English
7. Português (Brasil) - `pt-BR` ⏳ falls back to English
8. 日本語 - `ja` ⏳ falls back to English
9. Nederlands - `nl` ⏳ falls back to English
10. Italiano - `it` ⏳ falls back to English
11. Русский - `ru` ⏳ falls back to English
12. हिन्दी - `hi` ⏳ falls back to English
13. Norsk - `no` ⏳ falls back to English
14. Türkçe - `tr` ⏳ falls back to English
15. 한국어 - `ko` ⏳ falls back to English
16. বাংলা - `bn` ⏳ falls back to English

---

## 3. Goals & Objectives

### Primary Goals
1. **Enable Multi-Language Content**: Translate all user-facing content into 16 supported languages
2. **SEO Optimization**: Implement proper locale-based routing for search engine discoverability
3. **User Experience**: Seamless language switching without full page reload
4. **Maintainability**: Structured translation management system for easy updates

### Success Metrics
- All pages accessible in all 16 languages
- Language preference persists across sessions
- SEO-friendly URLs with locale prefixes (e.g., `/fr/about`) — English uses no prefix (`/about`)
- Zero hydration errors during language switching
- Translation coverage: 100% for critical pages, 80%+ for all pages

---

## 4. Technical Requirements

### 4.1 Technology Stack
- **i18n Library**: `next-intl` v4.8.3 ✅ installed
- **Translation Format**: JSON files organized by locale and namespace ✅
- **Routing**: Next.js App Router with `[locale]` dynamic segment + `localePrefix: 'as-needed'` ✅
- **State Management**: Redux (`localeSlice`) + `NextIntlClientProvider` ✅

### 4.2 Architecture (Implemented)

#### Folder Structure
```
src/
├── app/
│   ├── layout.tsx                   # Minimal root layout (html/body + fonts only)
│   └── [locale]/
│       ├── layout.tsx               # Locale layout: NextIntlClientProvider, Providers, Header, Footer, RTL dir
│       ├── (landing)/page.tsx       # Home page
│       ├── about/page.tsx
│       ├── blog/page.tsx
│       ├── blog/[slug]/page.tsx
│       ├── contact/page.tsx
│       ├── portfolio/page.tsx
│       ├── portfolio/[slug]/page.tsx
│       ├── services/page.tsx
│       ├── error.tsx
│       └── loading.tsx
├── i18n/
│   ├── routing.ts                   # defineRouting — locales list, defaultLocale, localePrefix
│   ├── request.ts                   # getRequestConfig — loads messages, falls back to English
│   └── locales/
│       ├── en/                      # ✅ Complete baseline
│       │   ├── common.json
│       │   ├── navigation.json
│       │   ├── home.json
│       │   ├── about.json
│       │   ├── services.json
│       │   ├── portfolio.json
│       │   ├── blog.json
│       │   └── contact.json
│       └── [other locales]/         # ⏳ To be translated — auto-falls back to English
├── middleware.ts                    # next-intl middleware for locale detection & routing
├── store/
│   └── slices/
│       └── localeSlice.ts           # setLocale, initializeLocale — syncs to localStorage
└── types/
    └── i18n.ts                      # Locale, LocaleState, TranslationNamespace types
```

#### Key Architectural Decisions

**`localePrefix: 'as-needed'`** — English (default) uses no URL prefix (`/about`), all other locales get prefixed (`/fr/about`). This avoids breaking existing English URLs.

**Graceful fallback** — `i18n/request.ts` catches missing locale files and falls back to English per namespace, so adding a new language's translations is incremental — partially translated locales work immediately.

**Two-layer layout** — `app/layout.tsx` is a minimal html/body shell. `app/[locale]/layout.tsx` owns all providers, Header, Footer, and the `dir` attribute for RTL. These must not be merged.

**Redux + next-intl** — `localeSlice` persists the selected locale to `localStorage` under key `preferred-language`. `useLocale()` from next-intl is the source of truth for the current locale in components.

### 4.3 Locale Detection Priority
1. URL path segment (e.g., `/fr/about`)
2. User's saved preference (localStorage key: `preferred-language`)
3. Browser's `Accept-Language` header
4. Default fallback: `en` (English)

### 4.4 Translation Key Convention
```json
// Namespace: home, key path: hero.title
{ "hero": { "title": "Building digital experiences that matter" } }
```

Namespaces: `common` · `navigation` · `home` · `about` · `services` · `portfolio` · `blog` · `contact`

Usage in server components:
```typescript
import { getTranslations } from 'next-intl/server';
const t = await getTranslations('home');
return <h1>{t('hero.title')}</h1>;
```

Usage in client components:
```typescript
import { useTranslations } from 'next-intl';
const t = useTranslations('home');
return <h1>{t('hero.title')}</h1>;
```

### 4.5 Adding a New Language's Translations
Create files at `src/i18n/locales/[code]/*.json` matching the English structure. Until a file exists, that namespace falls back to English automatically.

### 4.6 RTL Support
- Arabic (`ar`) sets `dir="rtl"` on the wrapping `<div>` in `[locale]/layout.tsx`
- Use Tailwind's RTL utilities (`rtl:`) for mirrored layouts in components

---

## 5. User Stories

### US-1: Language Selection ✅ Implemented
**As a** visitor, **I want to** select my preferred language from the language switcher, **so that** I can view the website content in my native language.

**Status:**
- ✅ Language switcher displays all 16 languages with flags
- ✅ Selected language highlighted with checkmark
- ✅ Language change navigates to locale-prefixed URL
- ✅ Selection stored in Redux store
- ✅ Selection persisted to localStorage (`preferred-language`)
- ⏳ Content actually translated (pending Phase 3)

### US-2: Default Language Behavior ✅ Implemented
**As a** first-time visitor, **I want to** see content in English by default.

**Status:** ✅ English is default, no URL prefix required, stored in Redux + localStorage.

### US-3: SEO-Friendly URLs ✅ Routing Implemented / ⏳ Tags Pending
**As a** search engine, **I want to** index locale-specific pages.

**Status:**
- ✅ URLs include locale prefix (`/fr/about`, `/ar`)
- ⏳ `hreflang` tags — Phase 4
- ⏳ Sitemap — Phase 4

### US-4: Content Translation ⏳ Phase 3
**As a** content manager, **I want to** easily add/update translations.

**Status:** English baseline complete. Structure and fallback mechanism in place. Translations for other locales pending.

---

## 6. Redux Integration

### Locale Slice (`src/store/slices/localeSlice.ts`)
```typescript
type LocaleState = {
  currentLocale: Locale;   // LanguageCode type from constants/languages.ts
  isRTL: boolean;
};
```

**Actions:**
- `setLocale(locale)` — updates state, sets `isRTL`, saves to `localStorage`
- `initializeLocale()` — reads from `localStorage` or defaults to `'en'`

**RTL locales:** `['ar']`
**Storage key:** `preferred-language`

---

## 7. Implementation Phases

### Phase 1: Foundation ✅ Complete
- [x] Install and configure `next-intl` v4
- [x] Set up `[locale]` routing with `localePrefix: 'as-needed'`
- [x] Create `src/i18n/routing.ts`, `request.ts`
- [x] Implement `src/middleware.ts` for locale detection
- [x] Create `localeSlice` in Redux store
- [x] Update `[locale]/layout.tsx` with `NextIntlClientProvider`
- [x] Create `src/types/i18n.ts`

### Phase 2: Core Translation Infrastructure ✅ Complete
- [x] Create English baseline translation files (all 8 namespaces)
- [x] Implement graceful fallback to English for missing locale files
- [x] Connect LanguageSwitcher to `useLocale()` + router navigation
- [x] Implement RTL support (`dir` attribute for Arabic)
- [x] Restructure all pages under `app/[locale]/`

### Phase 3: Content Translation ⏳ In Progress
- [ ] Wire `useTranslations()` / `getTranslations()` into page components
- [ ] Translate common UI elements (all 15 non-English locales)
- [ ] Translate navigation (all locales)
- [ ] Translate home page (all locales)
- [ ] Translate about page (all locales)
- [ ] Translate services page (all locales)
- [ ] Translate portfolio page (all locales)
- [ ] Translate blog page (all locales)
- [ ] Translate contact page (all locales)

### Phase 4: SEO & Optimization ⏳ Pending
- [ ] Add `hreflang` tags via `generateMetadata` per locale
- [ ] Generate multi-locale sitemap
- [ ] Update `openGraph.locale` per locale in metadata
- [ ] Implement locale-specific canonical URLs
- [ ] Test with Google Search Console

### Phase 5: Testing & QA ⏳ Pending
- [ ] Test all pages in all 16 languages
- [ ] Test RTL layout (Arabic) — layout renders, content pending
- [ ] Test language persistence across sessions
- [ ] Test URL routing for all locales
- [ ] Performance testing
- [ ] Accessibility testing (WCAG 2.1 AA)
- [ ] Cross-browser testing

---

## 8. Dependencies

### NPM Packages
```json
{
  "dependencies": {
    "next-intl": "^4.8.3"
  }
}
```

### Existing Dependencies (No Changes)
- Next.js 15.4.4
- React 19.1.0
- Redux Toolkit 2.11.2
- TypeScript 5.8.3

---

## 9. Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Translation quality issues | High | High | Use professional translation services for critical content |
| SEO ranking drop during migration | High | Low | `localePrefix: 'as-needed'` preserves all existing English URLs — no redirect needed |
| Performance degradation | Medium | Low | Namespace-based message loading; only active locale messages are loaded |
| RTL layout breaking UI | Medium | Medium | Comprehensive testing with Arabic locale; Tailwind RTL utilities |
| Hydration errors | High | Low | `next-intl` server/client split handled correctly via `NextIntlClientProvider` in `[locale]/layout.tsx` |

---

## 10. Testing Strategy

### Unit Tests
- Translation key resolution
- `localeSlice` actions/reducers (`setLocale`, `initializeLocale`)

### Integration Tests
- Language switching flow (URL changes correctly)
- Locale persistence (localStorage read/write)
- Fallback to English when locale file missing

### E2E Tests
- Complete user journey in different languages
- Language switcher interaction
- Page navigation with locale preservation

### Manual Testing Checklist
- [ ] All 16 languages selectable and URL updates correctly
- [ ] RTL layout works for Arabic
- [ ] Language persists across browser sessions
- [ ] SEO tags present in all locales (Phase 4)
- [ ] No console errors/warnings
- [ ] Smooth transitions between languages

---

## 11. Future Enhancements

1. **Dynamic Translation Loading**: Per-namespace lazy loading to reduce initial bundle size
2. **AI-Powered Translations**: Auto-translate missing keys using Claude API
3. **Language-Specific Content**: Different content variations per locale
4. **Locale-Specific Formatting**: Dates, numbers, currencies per locale using `Intl`
5. **Translation Management UI**: Admin panel for managing translations without code changes

---

**Document Owner:** Development Team
**Last Updated:** 2026-03-22
**Next Review:** After Phase 3 completion
