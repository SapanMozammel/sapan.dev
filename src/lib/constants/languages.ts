export const LANGUAGES = [
	{ code: 'en', name: 'English (US)', flag: '🇺🇸' },
	{ code: 'fr', name: 'Français', flag: '🇫🇷' },
	{ code: 'de', name: 'Deutsch', flag: '🇩🇪' },
	{ code: 'es', name: 'Español', flag: '🇪🇸' },
	{ code: 'ar', name: 'العربية', flag: '🇸🇦' },
	{ code: 'zh-CN', name: '中文 (简体)', flag: '🇨🇳' },
	{ code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
	{ code: 'ja', name: '日本語', flag: '🇯🇵' },
	{ code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
	{ code: 'it', name: 'Italiano', flag: '🇮🇹' },
	{ code: 'ru', name: 'Русский', flag: '🇷🇺' },
	{ code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
	{ code: 'no', name: 'Norsk', flag: '🇳🇴' },
	{ code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
	{ code: 'ko', name: '한국어', flag: '🇰🇷' },
	{ code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]['code'];
export type Language = (typeof LANGUAGES)[number];

