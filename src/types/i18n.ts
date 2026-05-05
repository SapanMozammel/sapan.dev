import type { LanguageCode } from '@/data/config/languages';

export type Locale = LanguageCode;

export type LocaleState = {
	currentLocale: Locale;
	isRTL: boolean;
};
