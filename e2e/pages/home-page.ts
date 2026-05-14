import type { Locator, Page } from '@playwright/test';

export const SECTION_IDS = ['home', 'technologies', 'portfolio', 'experience', 'testimonials', 'workflow', 'blog', 'faq'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export class HomePage {
	readonly page: Page;
	readonly heroHeading: Locator;
	readonly experienceCanvas: Locator;
	readonly connectCta: Locator;

	constructor(page: Page) {
		this.page = page;
		this.heroHeading = page.locator('section#home h1');
		this.experienceCanvas = page.locator('section#experience canvas').first();
		this.connectCta = page.getByRole('button', { name: /connect/i }).first();
	}

	async goto(localePrefix = '') {
		await this.page.goto(`${localePrefix}/`);
	}

	section(id: SectionId): Locator {
		return this.page.locator(`section#${id}`).first();
	}

	async scrollToSection(id: SectionId) {
		const section = this.section(id);
		await section.scrollIntoViewIfNeeded();
		return section;
	}
}
