import enNav from '../src/i18n/locales/en/navigation.json';
import { expect, test } from './fixtures';

const SAMPLE_LOCALES = ['en', 'fr', 'de', 'es', 'ja', 'zh-CN', 'ar'] as const;
type SampleLocale = (typeof SAMPLE_LOCALES)[number];

const localePath = (locale: SampleLocale) => (locale === 'en' ? '/' : `/${locale}`);

test.describe('i18n — locale rendering', () => {
	for (const locale of SAMPLE_LOCALES) {
		test(`${locale}: <html lang>, <html dir>, and URL prefix are correct`, async ({ page }) => {
			await page.goto(localePath(locale));

			const langAttr = await page.locator('html').getAttribute('lang');
			expect(langAttr).toBe(locale);

			const dirAttr = await page.locator('html').getAttribute('dir');
			expect(dirAttr).toBe(locale === 'ar' ? 'rtl' : 'ltr');

			if (locale === 'en') {
				await expect(page).toHaveURL(/^https?:\/\/[^/]+\/?(\?.*)?$/);
			} else {
				await expect(page).toHaveURL(new RegExp(`/${locale}/?(\\?.*)?$`));
			}
		});
	}

	test('non-en nav copy diverges from the en baseline', async ({ page }, testInfo) => {
		// Desktop NavMenu is hidden on mobile (md:flex breakpoint) — assertion compares the
		// rendered desktop nav against the en baseline, so mobile-* projects must skip.
		test.skip(testInfo.project.name.startsWith('mobile-'), 'Desktop nav is hidden behind the md: breakpoint on mobile projects');
		await page.goto('/fr');
		const navTexts = await page
			.getByRole('navigation')
			.first()
			.getByRole('link')
			.allTextContents();
		const baselineKeys = Object.values(enNav);
		const intersection = navTexts.filter((t) => baselineKeys.includes(t.trim()));
		expect(intersection.length).toBeLessThan(navTexts.length);
	});

	test('locale persists across reload via localStorage + URL prefix', async ({ page }) => {
		await page.goto('/fr');
		await page.reload();
		await expect(page).toHaveURL(/\/fr\/?$/);
		expect(await page.locator('html').getAttribute('lang')).toBe('fr');
	});
});
