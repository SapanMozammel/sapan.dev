import { LANGUAGES } from '@/data/config/languages';
import { RTL_LOCALES } from '@/i18n/routing';
import type { Locale, LocaleState } from '@/types/i18n';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const LOCALE_STORAGE_KEY = 'preferred-language';

const getInitialLocale = (): Locale => {
	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
		if (saved && LANGUAGES.some((lang) => lang.code === saved)) {
			return saved as Locale;
		}
	}
	return 'en';
};

const initialState: LocaleState = {
	currentLocale: 'en',
	isRTL: false,
};

const localeSlice = createSlice({
	name: 'locale',
	initialState,
	reducers: {
		setLocale: (state, action: PayloadAction<Locale>) => {
			state.currentLocale = action.payload;
			state.isRTL = RTL_LOCALES.includes(action.payload);
		},
		initializeLocale: (state) => {
			const locale = getInitialLocale();
			state.currentLocale = locale;
			state.isRTL = RTL_LOCALES.includes(locale);
		},
	},
});

export const { setLocale, initializeLocale } = localeSlice.actions;
export default localeSlice.reducer;
