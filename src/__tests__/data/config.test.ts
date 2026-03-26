import { LANGUAGES } from '@/data/config/languages';
import { TECH_STACK } from '@/data/config/technologies';
import { describe, expect, it } from 'vitest';

describe('LANGUAGES', () => {
	it('has at least one language', () => {
		expect(LANGUAGES.length).toBeGreaterThan(0);
	});

	it('includes English as first language', () => {
		expect(LANGUAGES[0].code).toBe('en');
		expect(LANGUAGES[0].name).toBe('English (US)');
	});

	it('each language has code, name, and flag', () => {
		for (const lang of LANGUAGES) {
			expect(lang.code).toBeTruthy();
			expect(lang.name).toBeTruthy();
			expect(lang.flag).toBeTruthy();
		}
	});

	it('has unique language codes', () => {
		const codes = LANGUAGES.map((l) => l.code);
		expect(new Set(codes).size).toBe(codes.length);
	});

	it('includes Arabic for RTL testing', () => {
		expect(LANGUAGES.some((l) => l.code === 'ar')).toBe(true);
	});
});

describe('TECH_STACK', () => {
	it('has technology items', () => {
		expect(TECH_STACK.length).toBeGreaterThan(0);
	});
});
