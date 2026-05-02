import { expect, test } from './fixtures';
import { HomePage } from './pages/HomePage';

const isMobileProject = (name: string) => name.startsWith('mobile-');

test.describe('navigation — desktop NavMenu', () => {
	test.beforeEach(({ }, testInfo) => {
		test.skip(isMobileProject(testInfo.project.name), 'Desktop nav is hidden on mobile breakpoints');
	});

	test('section links smooth-scroll to their target', async ({ page }) => {
		const home = new HomePage(page);
		await home.goto();

		for (const sectionId of ['portfolio', 'experience', 'workflow'] as const) {
			await page.getByRole('navigation').first().getByRole('link', { name: new RegExp(`^${sectionId}$`, 'i') }).click();
			await expect(home.section(sectionId)).toBeInViewport({ ratio: 0.1 });
		}
	});

	test('Articles link navigates to the listing route', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('navigation').first().getByRole('link', { name: /articles/i }).click();
		await expect(page).toHaveURL(/\/articles$/);
	});

	test('logo link returns to the landing page', async ({ page }) => {
		await page.goto('/articles');
		await page.getByRole('banner').getByRole('link').first().click();
		await expect(page).toHaveURL(/(\/|\/[a-z]{2}(-[A-Za-z]+)?)?$/);
	});

	test('active section gains the primary token class on scroll', async ({ page }) => {
		const home = new HomePage(page);
		await home.goto();
		await home.scrollToSection('portfolio');

		const portfolioLink = page.getByRole('navigation').first().getByRole('link', { name: /^portfolio$/i });
		await expect(portfolioLink).toHaveClass(/text-primary/);
	});
});

test.describe('navigation — MobileNav', () => {
	test.beforeEach(({ }, testInfo) => {
		test.skip(!isMobileProject(testInfo.project.name), 'MobileNav is rendered only on mobile breakpoints');
	});

	test('hamburger trigger opens the navigation drawer', async ({ page }) => {
		await page.goto('/');
		const trigger = page.getByRole('button', { name: /toggle menu/i });
		await trigger.click();
		await expect(page.getByRole('dialog', { name: /navigation menu/i })).toBeVisible();
	});

	test('selecting a section from the drawer scrolls and closes it', async ({ page }) => {
		const home = new HomePage(page);
		await home.goto();
		await page.getByRole('button', { name: /toggle menu/i }).click();
		const dialog = page.getByRole('dialog', { name: /navigation menu/i });
		await expect(dialog).toBeVisible();

		// Drawer link's accessible name includes a trailing number badge (e.g. "Portfolio  03"),
		// so anchor on a more permissive substring.
		await dialog.getByRole('link', { name: /portfolio/i }).first().click();
		await expect(dialog).toBeHidden();
		await expect(home.section('portfolio')).toBeInViewport({ ratio: 0.1 });
	});
});
