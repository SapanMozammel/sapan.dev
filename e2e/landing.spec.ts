import homeMessages from '../src/i18n/locales/en/home.json';
import { expect, test } from './fixtures';
import { HomePage, SECTION_IDS } from './pages/HomePage';

test.describe('landing page', () => {
	test('renders all 8 anchored sections', async ({ page }) => {
		const home = new HomePage(page);
		await home.goto();

		for (const id of SECTION_IDS) {
			await home.scrollToSection(id);
			await expect(home.section(id)).toBeVisible();
		}
	});

	test('Hero exposes the screen-reader title from i18n', async ({ page }) => {
		const home = new HomePage(page);
		await home.goto();
		await expect(home.heroHeading).toHaveText(homeMessages.hero.srTitle);
	});

	test('Experience section mounts the R3F particle <canvas>', async ({ page }, testInfo) => {
		// ParticleBackground gates the WebGL scene behind `useReducedMotion()` AND skips coarse-
		// pointer (mobile) devices to save battery — see `ParticleBackground.tsx` comments. So:
		//   1. Opt out of reduced-motion (sapan default is `reduce` for stable assertions).
		//   2. Skip on mobile-* projects since the canvas is intentionally never mounted there.
		test.skip(testInfo.project.name.startsWith('mobile-'), 'WebGL scene is intentionally skipped on coarse-pointer devices');
		await page.emulateMedia({ reducedMotion: 'no-preference' });
		const home = new HomePage(page);
		await home.goto();
		await home.scrollToSection('experience');
		await expect(page.locator('section#experience canvas').first()).toBeAttached({ timeout: 15_000 });
	});

	test('lazy-loaded sections hydrate after scroll', async ({ page }) => {
		const home = new HomePage(page);
		await home.goto();

		for (const id of ['technologies', 'portfolio', 'testimonials', 'workflow'] as const) {
			await home.scrollToSection(id);
			await expect(home.section(id)).toBeVisible();
			await expect(home.section(id).locator('h2,h3').first()).toBeVisible();
		}
	});
});
