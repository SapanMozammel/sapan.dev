import { expect, test } from './fixtures';

// Scoped to the `motion-on` Playwright project only — other projects emulate
// `prefers-reduced-motion: reduce` for stability and would zero out these animations.
//
// Notes on the current sapan architecture (deviations from earlier spec drafts):
// - Hero is a server-rendered <h1>/<h2>/<p> with no Framer Motion entrance any more (was
//   replaced by tabbed AboutScreen). Removed the Hero opacity-poll assertion entirely.
// - The "Technologies marquee" in the PRD is actually a Framer Motion marquee in Testimonials.
//   The Technologies section uses DiamondGrid (no marquee). Replaced the GSAP-x-translate
//   sample with the Testimonials Framer marquee bounding-box sample.

test.beforeEach(async ({ page }, testInfo) => {
	test.skip(testInfo.project.name !== 'motion-on', 'motion.spec.ts is gated to the motion-on project');
	// The default `page` fixture in e2e/fixtures.ts emulates `prefers-reduced-motion: reduce` for
	// stable assertions across all projects. The motion-on project intentionally exercises real
	// motion, so override back to `no-preference` here.
	await page.emulateMedia({ reducedMotion: 'no-preference' });
});

test.describe('motion (motion-on project only)', () => {
	test('Testimonials Framer marquee advances horizontally over time', async ({ page }) => {
		await page.goto('/');
		const testimonials = page.locator('section#testimonials').first();
		await testimonials.scrollIntoViewIfNeeded();
		await expect(testimonials).toBeVisible({ timeout: 15_000 });

		const firstChild = testimonials.locator('[class*="flex-row"] > *').first();
		await expect(firstChild).toBeAttached({ timeout: 15_000 });

		const sampleX = async () => {
			const box = await firstChild.boundingBox();
			return box?.x ?? null;
		};

		const initialX = await sampleX();
		expect(initialX, 'expected the marquee child to have a measurable bounding box').not.toBeNull();

		// Wait for the marquee to advance — assert "moves over time" without coupling to a
		// specific delta. Generous timeout accommodates rAF jitter under headless Chromium.
		await expect
			.poll(
				async () => {
					const next = await sampleX();
					if (next === null || initialX === null) return false;
					return Math.abs(next - initialX) > 0.5;
				},
				{ timeout: 5_000, message: 'marquee did not advance' }
			)
			.toBe(true);
	});

	test('Experience R3F <canvas> mounts under un-emulated motion (coarse-pointer fallback excluded)', async ({ page }, testInfo) => {
		test.skip(testInfo.project.name.startsWith('mobile-'), 'WebGL scene is intentionally skipped on coarse-pointer devices');

		await page.goto('/');
		const experience = page.locator('section#experience').first();
		await experience.scrollIntoViewIfNeeded();
		await expect(experience).toBeVisible({ timeout: 15_000 });
		await expect(experience.locator('canvas').first()).toBeAttached({ timeout: 15_000 });
	});
});
