import type { LanguageCode } from '@/lib/constants/languages';

export type Locale = LanguageCode;

export type LocaleState = {
	currentLocale: Locale;
	isRTL: boolean;
};

export type TranslationNamespace = 'common' | 'navigation' | 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact';
