import { LANGUAGES } from '@/data/config/languages';
import { defineRouting } from 'next-intl/routing';

export const locales = LANGUAGES.map((lang) => lang.code) as [string, ...string[]];

export const RTL_LOCALES: readonly string[] = ['ar'];

export const routing = defineRouting({
	locales,
	defaultLocale: 'en',
	localePrefix: 'as-needed',
});
