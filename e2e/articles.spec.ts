import { expect, test } from './fixtures';
import { ArticlesPage } from './pages/articles-page';

test.describe('articles', () => {
	test('listing renders at least one card', async ({ page }) => {
		const articles = new ArticlesPage(page);
		await articles.goto();
		await expect(articles.cards.first()).toBeVisible();
	});

	test('clicking a card navigates to the detail route and renders the title', async ({ page }) => {
		const articles = new ArticlesPage(page);
		await articles.goto();
		const slug = await articles.firstArticleSlug();

		await articles.cards.first().click();
		await expect(page).toHaveURL(new RegExp(`/articles/${slug}$`));
		await expect(page.locator('h1')).toBeVisible();
	});

	test('browser back from detail returns to the listing', async ({ page }) => {
		const articles = new ArticlesPage(page);
		await articles.goto();
		await articles.cards.first().click();
		await page.waitForURL(/\/articles\/[^/]+$/);
		await page.goBack({ waitUntil: 'domcontentloaded' });
		await expect(page).toHaveURL(/\/articles$/);
		await expect(articles.cards.first()).toBeVisible();
	});

	test('locale-prefixed listing renders for /fr/articles', async ({ page }) => {
		await page.goto('/fr/articles');
		await expect(page).toHaveURL(/\/fr\/articles$/);
		await expect(page.locator('main a[href*="/articles/"]').first()).toBeVisible();
	});
});
