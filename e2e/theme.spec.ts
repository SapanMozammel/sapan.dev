import { expect, test } from './fixtures';

const setStoredTheme = async (page: import('@playwright/test').Page, value: 'dark' | 'light') => {
	await page.addInitScript((stored: 'dark' | 'light') => {
		try {
			window.localStorage.setItem('theme', stored);
		} catch {
			// best-effort; some environments restrict localStorage at init
		}
	}, value);
};

test.describe('theme', () => {
	test('persisted dark theme adds .dark to <html> and survives reload', async ({ page }) => {
		await setStoredTheme(page, 'dark');
		await page.goto('/');
		await expect(page.locator('html')).toHaveClass(/(^|\s)dark(\s|$)/);

		await page.reload();
		await expect(page.locator('html')).toHaveClass(/(^|\s)dark(\s|$)/);
	});

	test('persisted light theme keeps .dark off <html>', async ({ page }) => {
		await setStoredTheme(page, 'light');
		await page.goto('/');
		const className = (await page.locator('html').getAttribute('class')) ?? '';
		expect(className).not.toMatch(/(^|\s)dark(\s|$)/);
	});

	test('Hero heading swaps to the dark token when .dark is active', async ({ page }) => {
		await setStoredTheme(page, 'dark');
		await page.goto('/');
		await expect(page.locator('html')).toHaveClass(/(^|\s)dark(\s|$)/);

		const successToken = await page.evaluate(() => {
			const probe = document.createElement('div');
			probe.style.color = 'var(--color-success)';
			document.documentElement.appendChild(probe);
			const value = getComputedStyle(probe).color;
			probe.remove();
			return value;
		});

		const headingColor = await page
			.locator('section#home .text-primary, section#home .dark\\:text-success')
			.first()
			.evaluate((el) => getComputedStyle(el).color);

		expect(headingColor).toBe(successToken);
	});

	test('toggling theme via UI flips the .dark class', async ({ page }) => {
		await setStoredTheme(page, 'light');
		await page.goto('/');

		const headerButtons = page.getByRole('banner').locator('button[type="button"]');
		const count = await headerButtons.count();
		expect(count).toBeGreaterThan(0);

		for (let i = 0; i < count; i++) {
			await headerButtons.nth(i).click();
			const darkOption = page.getByRole('button', { name: /^dark theme$/i });
			if (await darkOption.isVisible().catch(() => false)) {
				await darkOption.click();
				break;
			}
			await page.keyboard.press('Escape');
		}

		await expect(page.locator('html')).toHaveClass(/(^|\s)dark(\s|$)/);
	});
});
