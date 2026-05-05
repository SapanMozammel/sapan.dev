import localeReducer, { initializeLocale, LOCALE_STORAGE_KEY, setLocale } from '@/store/slices/locale-slice';
import type { LocaleState } from '@/types/i18n';
import { afterEach, describe, expect, it } from 'vitest';

describe('localeSlice', () => {
	const initialState: LocaleState = { currentLocale: 'en', isRTL: false };

	it('has correct initial state', () => {
		expect(localeReducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	it('sets locale to a non-RTL language', () => {
		const state = localeReducer(initialState, setLocale('fr'));
		expect(state.currentLocale).toBe('fr');
		expect(state.isRTL).toBe(false);
	});

	it('sets locale to an RTL language', () => {
		const state = localeReducer(initialState, setLocale('ar'));
		expect(state.currentLocale).toBe('ar');
		expect(state.isRTL).toBe(true);
	});

	it('switches from RTL back to LTR', () => {
		const rtlState: LocaleState = { currentLocale: 'ar', isRTL: true };
		const state = localeReducer(rtlState, setLocale('en'));
		expect(state.currentLocale).toBe('en');
		expect(state.isRTL).toBe(false);
	});

	describe('initializeLocale', () => {
		afterEach(() => {
			localStorage.clear();
		});

		it('defaults to en when no saved preference', () => {
			const state = localeReducer(undefined, initializeLocale());
			expect(state.currentLocale).toBe('en');
			expect(state.isRTL).toBe(false);
		});

		it('reads saved locale from localStorage', () => {
			localStorage.setItem(LOCALE_STORAGE_KEY, 'fr');
			const state = localeReducer(undefined, initializeLocale());
			expect(state.currentLocale).toBe('fr');
			expect(state.isRTL).toBe(false);
		});

		it('reads saved RTL locale from localStorage', () => {
			localStorage.setItem(LOCALE_STORAGE_KEY, 'ar');
			const state = localeReducer(undefined, initializeLocale());
			expect(state.currentLocale).toBe('ar');
			expect(state.isRTL).toBe(true);
		});

		it('ignores invalid saved locale', () => {
			localStorage.setItem(LOCALE_STORAGE_KEY, 'invalid-code');
			const state = localeReducer(undefined, initializeLocale());
			expect(state.currentLocale).toBe('en');
		});
	});
});
