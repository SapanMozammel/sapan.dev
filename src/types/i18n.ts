import type { LanguageCode } from '@/data/config/languages';

export type Locale = LanguageCode;

export type LocaleState = {
	currentLocale: Locale;
	isRTL: boolean;
};

export type TranslationNamespace = 'common' | 'navigation' | 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact';
