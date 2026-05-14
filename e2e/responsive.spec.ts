import { expect, test } from './fixtures';
import { HomePage } from './pages/home-page';

test.describe('responsive layout (mobile only)', () => {
	test.beforeEach(({ }, testInfo) => {
		test.skip(!testInfo.project.name.startsWith('mobile-'), 'Responsive checks target the mobile-* projects only');
	});

	test('hamburger is visible and desktop nav is hidden', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('button', { name: /toggle menu/i })).toBeVisible();
		const desktopNav = page.locator('nav.hidden.md\\:flex').first();
		await expect(desktopNav).toBeHidden();
	});

	test('document has no horizontal overflow', async ({ page }) => {
		await page.goto('/');
		const overflow = await page.evaluate(() => {
			const root = document.documentElement;
			return root.scrollWidth - root.clientWidth;
		});
		expect(overflow).toBeLessThanOrEqual(1);
	});

	test('CSS fallback for Experience particle scene is rendered (no WebGL on mobile)', async ({ page }) => {
		// `ParticleBackground` intentionally skips the WebGL scene on coarse-pointer devices
		// (see source comments) — instead it renders a CSS `bg-primary/45 dark:bg-success/45`
		// glow blob fallback. Assert the fallback exists and stays bounded to viewport width.
		const home = new HomePage(page);
		await home.goto();
		await home.scrollToSection('experience');

		const fallback = page.locator('section#experience [class*="bg-primary"]').first();
		await expect(fallback).toBeAttached({ timeout: 10_000 });

		const measurements = await page.evaluate(() => {
			const el = document.querySelector('section#experience [class*="bg-primary"]') as HTMLElement | null;
			if (!el) {
				return null;
			}
			const rect = el.getBoundingClientRect();
			return { width: rect.width, viewportWidth: window.innerWidth };
		});

		expect(measurements).not.toBeNull();
		if (measurements) {
			expect(measurements.width).toBeLessThanOrEqual(measurements.viewportWidth + 1);
		}
	});

	test('sections render in a single column at mobile breakpoint', async ({ page }) => {
		const home = new HomePage(page);
		await home.goto();
		await home.scrollToSection('technologies');
		await home.scrollToSection('portfolio');

		const portfolioRect = await home.section('portfolio').boundingBox();
		const techRect = await home.section('technologies').boundingBox();
		expect(portfolioRect).not.toBeNull();
		expect(techRect).not.toBeNull();
		if (portfolioRect && techRect) {
			expect(portfolioRect.y).toBeGreaterThan(techRect.y);
		}
	});
});
