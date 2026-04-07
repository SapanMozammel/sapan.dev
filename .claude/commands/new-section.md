# /new-section [Name]

**Purpose:** Scaffold a new landing page section.

Steps Claude must follow:
1. Confirm `Name` is provided — ask if missing
2. Read an existing similar section for reference (e.g. `src/components/layout/Faq/`)
3. Load `component-patterns.md` and `spacing.md`
4. Decide Server vs Client based on whether interactivity is needed
5. Create `src/components/layout/[Name]/index.tsx`:
   - Correct component type
   - `SectionSeparator` + `SectionTitle` structure
   - Section spacing: `py-8 sm:py-12 lg:py-16`
   - `cn()` for all classNames, design system tokens only
6. If data needed: create `src/data/content/[name].ts` + `src/types/[name].ts`
7. Add translation key stubs to the relevant `src/i18n/locales/en/[namespace].json`
8. Show the import line for `src/app/[locale]/(landing)/page.tsx`

**Rules:** Always use SectionSeparator + SectionTitle structure. Design system tokens only — no hardcoded values. Default to Server Component unless interactivity is explicitly required.
