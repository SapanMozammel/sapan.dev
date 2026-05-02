import type { Locator, Page } from '@playwright/test';

export class ArticlesPage {
	readonly page: Page;
	readonly listing: Locator;
	readonly cards: Locator;

	constructor(page: Page) {
		this.page = page;
		this.listing = page.locator('main');
		this.cards = page.locator('main a[href*="/articles/"]');
	}

	async goto(localePrefix = '') {
		await this.page.goto(`${localePrefix}/articles`);
	}

	async goToArticle(slug: string) {
		const link = this.cards.filter({ has: this.page.locator(`[href$="/articles/${slug}"]`) }).first();
		await link.click();
	}

	async firstArticleSlug(): Promise<string> {
		const href = await this.cards.first().getAttribute('href');
		if (!href) {
			throw new Error('ArticlesPage: no article cards rendered');
		}
		const match = href.match(/\/articles\/([^/?#]+)/);
		if (!match) {
			throw new Error(`ArticlesPage: unexpected href shape ${href}`);
		}
		return match[1];
	}
}
