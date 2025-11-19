# Product Requirements Document (PRD)
## Multi-Language Support Implementation

**Project:** sapan.dev
**Feature:** Complete Internationalization (i18n) System
**Version:** 1.0
**Date:** 2025-11-18
**Status:** Planning

---

## 1. Executive Summary

Implement a comprehensive internationalization (i18n) system for sapan.dev to support multiple languages, enabling global reach and improved user experience for non-English speaking visitors. The system will build upon the existing LanguageSwitcher UI component and integrate with Next.js 15's App Router architecture.

### Key Requirements
- ✅ **Default Language**: English (`en`) - automatically selected on first visit
- ✅ **Storage**: Selected language stored in Redux store (runtime) + localStorage (persistence)
- ✅ **Storage Key**: `preferred-language` (consistent with current implementation)
- ✅ **Supported Languages**: 16 languages including RTL support for Arabic
- ✅ **SEO**: Locale-based routing with proper hreflang tags

---

## 2. Background & Context

### Current State
- ✅ LanguageSwitcher UI component exists with 16 supported languages
- ✅ Language selection persists to localStorage
- ✅ Visual language indicator (flags) in header
- ❌ No actual content translation implementation
- ❌ No i18n library integration
- ❌ No URL-based locale routing
- ❌ No translation files/dictionaries

### Supported Languages
The system will support 16 languages as defined in `src/lib/constants/languages.ts`:
1. English (US) - `en`
2. Français - `fr`
3. Deutsch - `de`
4. Español - `es`
5. العربية - `ar` (RTL support required)
6. 中文 (简体) - `zh-CN`
7. Português (Brasil) - `pt-BR`
8. 日本語 - `ja`
9. Nederlands - `nl`
10. Italiano - `it`
11. Русский - `ru`
12. हिन्दी - `hi`
13. Norsk - `no`
14. Türkçe - `tr`
15. 한국어 - `ko`
16. বাংলা - `bn`

---

## 3. Goals & Objectives

### Primary Goals
1. **Enable Multi-Language Content**: Translate all user-facing content into 16 supported languages
2. **SEO Optimization**: Implement proper locale-based routing for search engine discoverability
3. **User Experience**: Seamless language switching without page reload where possible
4. **Maintainability**: Structured translation management system for easy updates

### Success Metrics
- All pages accessible in all 16 languages
- Language preference persists across sessions
- SEO-friendly URLs with locale prefixes (e.g., `/en/about`, `/fr/about`)
- Zero hydration errors during language switching
- Translation coverage: 100% for critical pages, 80%+ for all pages

---

## 4. Technical Requirements

### 4.1 Technology Stack
- **i18n Library**: `next-intl` (recommended for Next.js 15 App Router)
  - Alternative: `next-i18next` (if App Router compatibility is needed)
- **Translation Format**: JSON files organized by locale
- **Routing**: Next.js App Router with `[locale]` dynamic segments
- **State Management**: Combine Redux (global state) + React Context (i18n provider)

### 4.2 Architecture Components

#### A. Folder Structure
```
src/
├── app/
│   └── [locale]/                    # Dynamic locale segment
│       ├── layout.tsx               # Locale-aware root layout
│       ├── page.tsx                 # Home page
│       ├── about/
│       ├── blog/
│       ├── contact/
│       ├── portfolio/
│       └── services/
├── i18n/
│   ├── config.ts                    # i18n configuration
│   ├── request.ts                   # Server-side locale detection
│   ├── routing.ts                   # Routing configuration
│   └── locales/                     # Translation files
│       ├── en/
│       │   ├── common.json          # Common translations
│       │   ├── navigation.json      # Navigation/menu items
│       │   ├── home.json            # Home page
│       │   ├── about.json           # About page
│       │   ├── blog.json            # Blog page
│       │   ├── contact.json         # Contact page
│       │   ├── portfolio.json       # Portfolio page
│       │   └── services.json        # Services page
│       ├── fr/
│       ├── de/
│       └── ... (other locales)
├── middleware.ts                    # Locale detection & routing
└── types/
    └── i18n.ts                      # i18n type definitions
```

#### B. Core Files to Create/Modify

**New Files:**
1. `src/i18n/config.ts` - i18n configuration
2. `src/i18n/request.ts` - Server-side locale handling
3. `src/i18n/routing.ts` - Routing configuration
4. `src/i18n/locales/[locale]/*.json` - Translation dictionaries
5. `src/middleware.ts` - Locale detection middleware
6. `src/types/i18n.ts` - TypeScript types for i18n
7. `src/store/slices/localeSlice.ts` - Redux slice for locale state

**Modified Files:**
1. `src/app/layout.tsx` → `src/app/[locale]/layout.tsx`
2. `src/app/(landing)/page.tsx` → `src/app/[locale]/page.tsx`
3. `src/components/layout/common/LanguageSwitcher.tsx` - Connect to i18n
4. `src/providers/index.tsx` - Add i18n provider
5. `next.config.js` - Add i18n configuration
6. All page components - Use translation hooks

### 4.3 Implementation Details

#### Locale Detection Priority
1. URL path segment (e.g., `/fr/about`)
2. User's saved preference (Redux store + localStorage)
3. Browser's `Accept-Language` header
4. Default fallback: `en` (English)

#### Locale Storage Requirements
- **Primary Storage**: Redux store (for runtime state management)
- **Persistence**: localStorage (for cross-session persistence)
- **Default Language**: English (`en`) - selected by default on first visit
- **Storage Key**: `preferred-language` (consistent with current implementation)
- **Sync Strategy**: Redux state syncs to localStorage on every locale change

#### Translation Key Naming Convention
```json
{
  "common": {
    "buttons": {
      "submit": "Submit",
      "cancel": "Cancel"
    },
    "errors": {
      "required": "This field is required"
    }
  },
  "navigation": {
    "home": "Home",
    "about": "About",
    "services": "Services"
  }
}
```

#### RTL Language Support
- Arabic (`ar`) requires RTL layout
- Implement `dir` attribute on `<html>` tag
- Mirror layouts using Tailwind's RTL utilities
- Test all UI components in RTL mode

---

## 5. User Stories

### US-1: Language Selection
**As a** visitor
**I want to** select my preferred language from the language switcher
**So that** I can view the website content in my native language

**Acceptance Criteria:**
- Language switcher displays all 16 languages
- English is selected by default on first visit
- Selected language is highlighted in the switcher
- Language change updates all content immediately
- Selection is stored in Redux store (runtime)
- Selection is persisted to localStorage (key: `preferred-language`)
- Selection persists across page navigation
- Selection persists across browser sessions

### US-2: Default Language Behavior
**As a** first-time visitor
**I want to** see content in English by default
**So that** I have a consistent initial experience

**Acceptance Criteria:**
- English (`en`) is the default language on first visit
- Default language is stored in Redux store and localStorage
- System can optionally detect browser language (future enhancement)
- If browser language detection is enabled, falls back to English if browser language not supported
- User can override default/detected language at any time

### US-3: SEO-Friendly URLs
**As a** search engine
**I want to** index locale-specific pages
**So that** users can find content in their language

**Acceptance Criteria:**
- URLs include locale prefix (e.g., `/fr/about`)
- Proper `hreflang` tags in HTML head
- Sitemap includes all locale variations
- Canonical URLs properly configured

### US-4: Content Translation
**As a** content manager
**I want to** easily add/update translations
**So that** content stays current across all languages

**Acceptance Criteria:**
- Translation files organized by page/section
- Clear naming conventions
- TypeScript type safety for translation keys
- Missing translations fall back to English

---

## 6. Technical Specifications

### 6.1 API Design

#### Translation Hook Usage
```typescript
// In a component
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <h1>{t('hero.title')}</h1>
  );
}
```

#### Locale Switching Function
```typescript
// In LanguageSwitcher component
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

const changeLanguage = (newLocale: string) => {
  const pathname = usePathname();
  const router = useRouter();

  // Replace current locale in path
  const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
  router.push(newPath);
};
```

### 6.2 Redux Integration

#### Locale Slice
```typescript
type LocaleState = {
  currentLocale: string;
  availableLocales: string[];
  isRTL: boolean;
};

// Initial state
const initialState: LocaleState = {
  currentLocale: 'en', // Default to English
  availableLocales: ['en', 'fr', 'de', 'es', 'ar', 'zh-CN', 'pt-BR', 'ja', 'nl', 'it', 'ru', 'hi', 'no', 'tr', 'ko', 'bn'],
  isRTL: false,
};
```

**Actions:**
- `setLocale(locale: string)` - Update current locale and sync to localStorage
- `toggleRTL()` - Toggle RTL mode (auto-set based on locale)
- `initializeLocale()` - Initialize from localStorage/browser (defaults to 'en')

**Storage Behavior:**
- On `setLocale`: Immediately save to `localStorage.setItem('language', locale)`
- On `initializeLocale`: Read from `localStorage.getItem('language')` or default to `'en'`
- Sync happens in Redux middleware or useEffect

### 6.3 Middleware Configuration

```typescript
// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(en|fr|de|es|ar|zh-CN|pt-BR|ja|nl|it|ru|hi|no|tr|ko|bn)/:path*']
};
```

---

## 7. Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Install and configure `next-intl`
- [ ] Set up folder structure (`[locale]` routing)
- [ ] Create i18n configuration files
- [ ] Implement middleware for locale detection
- [ ] Set up Redux locale slice
- [ ] Update providers with i18n context

### Phase 2: Core Translation (Week 2)
- [ ] Create English translation files (baseline)
- [ ] Implement translation hooks in all pages
- [ ] Update LanguageSwitcher to use i18n
- [ ] Test language switching functionality
- [ ] Implement RTL support for Arabic

### Phase 3: Content Translation (Week 3-4)
- [ ] Translate common UI elements (all languages)
- [ ] Translate navigation (all languages)
- [ ] Translate home page (all languages)
- [ ] Translate about page (all languages)
- [ ] Translate services page (all languages)
- [ ] Translate portfolio page (all languages)
- [ ] Translate blog page (all languages)
- [ ] Translate contact page (all languages)

### Phase 4: SEO & Optimization (Week 5)
- [ ] Add `hreflang` tags to all pages
- [ ] Generate multi-locale sitemap
- [ ] Update metadata for each locale
- [ ] Implement locale-specific Open Graph tags
- [ ] Test SEO with Google Search Console

### Phase 5: Testing & QA (Week 6)
- [ ] Test all pages in all languages
- [ ] Test RTL layout (Arabic)
- [ ] Test language persistence
- [ ] Test URL routing
- [ ] Performance testing
- [ ] Accessibility testing (WCAG compliance)
- [ ] Cross-browser testing

---

## 8. Dependencies

### NPM Packages
```json
{
  "dependencies": {
    "next-intl": "^3.x.x"
  }
}
```

### Existing Dependencies (No Changes)
- Next.js 15.4.4
- React 19.1.0
- Redux Toolkit 2.9.0
- TypeScript 5.8.3

---

## 9. Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Translation quality issues | High | High | Use professional translation services for critical content |
| SEO ranking drop during migration | High | Medium | Implement proper redirects and hreflang tags |
| Performance degradation | Medium | Low | Lazy load translation files, optimize bundle size |
| RTL layout breaking UI | Medium | Medium | Comprehensive testing with Arabic locale |
| Hydration errors | High | Medium | Use proper SSR/CSR patterns with next-intl |

---

## 10. Testing Strategy

### Unit Tests
- Translation key resolution
- Locale detection logic
- Redux locale slice actions/reducers

### Integration Tests
- Language switching flow
- URL routing with locales
- Persistence (localStorage)

### E2E Tests
- Complete user journey in different languages
- Language switcher interaction
- Page navigation with locale preservation

### Manual Testing Checklist
- [ ] All 16 languages display correctly
- [ ] RTL layout works for Arabic
- [ ] Language persists across sessions
- [ ] SEO tags present in all locales
- [ ] No console errors/warnings
- [ ] Smooth transitions between languages

---

## 11. Documentation Requirements

- [ ] Developer guide for adding new translations
- [ ] Translation key naming conventions
- [ ] How to add a new language
- [ ] Troubleshooting common i18n issues
- [ ] Performance optimization tips

---

## 12. Future Enhancements

1. **Dynamic Translation Loading**: Load translations on-demand to reduce initial bundle size
2. **Translation Management UI**: Admin panel for managing translations
3. **Crowdsourced Translations**: Allow community contributions
4. **AI-Powered Translations**: Auto-translate using GPT/Claude APIs
5. **Language-Specific Content**: Different content variations per locale
6. **Locale-Specific Formatting**: Dates, numbers, currencies per locale

---

## 13. Acceptance Criteria

### Definition of Done
- ✅ All 16 languages fully functional
- ✅ Zero TypeScript errors
- ✅ Zero console warnings
- ✅ All tests passing
- ✅ SEO tags implemented
- ✅ Performance benchmarks met (no >10% degradation)
- ✅ Accessibility standards met (WCAG 2.1 AA)
- ✅ Code review approved
- ✅ Documentation complete

---

## 14. Appendix

### A. Translation File Example
```json
// src/i18n/locales/en/home.json
{
  "hero": {
    "title": "Welcome to sapan.dev",
    "subtitle": "Building amazing web experiences",
    "cta": "Get Started"
  },
  "features": {
    "title": "What I Do",
    "items": [
      {
        "title": "Web Development",
        "description": "Creating modern, responsive websites"
      }
    ]
  }
}
```

### B. Useful Resources
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [RTL Styling Guide](https://rtlstyling.com/)

---

**Document Owner:** Development Team
**Last Updated:** 2025-11-18
**Next Review:** After Phase 1 completion
