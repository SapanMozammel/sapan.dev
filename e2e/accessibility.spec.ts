import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from './fixtures';

const SERIOUS_LEVELS = new Set(['critical', 'serious']);

const scanRoute = async (page: Page, path: string) => {
	await page.goto(path);
	await page.waitForLoadState('domcontentloaded');

	const builder = new AxeBuilder({ page })
		.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
		// Sapan-known false positives:
		// - color-contrast: gradient bg-clip-text headings (`Hero` / `Cta`) are intentionally
		//   rendered with `text-transparent` and read tone from the gradient. Axe cannot evaluate
		//   gradient fills, so it reports the placeholder color as low-contrast. Manual contrast
		//   review covered the gradient stops separately.
		.disableRules(['color-contrast']);

	const results = await builder.analyze();
	const blocking = results.violations.filter((v) => SERIOUS_LEVELS.has(v.impact ?? ''));
	return blocking;
};

test.describe('accessibility — axe-core scans', () => {
	test('homepage has no critical or serious violations', async ({ page }) => {
		const violations = await scanRoute(page, '/');
		expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
	});

	test('articles listing has no critical or serious violations', async ({ page }) => {
		const violations = await scanRoute(page, '/articles');
		expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
	});

	test('article detail has no critical or serious violations', async ({ page }) => {
		const violations = await scanRoute(page, '/articles/react-compiler-auto-memoization');
		expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
	});
});
