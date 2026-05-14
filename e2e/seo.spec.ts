import { LANGUAGES } from '../src/data/config/languages';
import { expect, test } from './fixtures';

const LOCALE_CODES = LANGUAGES.map((l) => l.code);

const parseLinkHeader = (header: string | null): Array<{ url: string; hreflang?: string; rel?: string }> => {
	if (!header) return [];
	return header.split(',').map((entry) => {
		const segments = entry.trim().split(';').map((s) => s.trim());
		const urlMatch = segments[0]?.match(/^<(.+)>$/);
		const url = urlMatch?.[1] ?? '';
		const params: Record<string, string> = {};
		for (const seg of segments.slice(1)) {
			const [k, v] = seg.split('=');
			if (k && v) params[k] = v.replace(/^"|"$/g, '');
		}
		return { url, ...params };
	});
};

test.describe('seo — homepage metadata', () => {
	test('renders a non-empty <title> matching the brand pattern', async ({ page }) => {
		await page.goto('/');
		const title = await page.title();
		expect(title.length).toBeGreaterThan(0);
		expect(title).toContain('Sapan Mozammel');
	});

	test('renders a non-empty <meta name="description">', async ({ page }) => {
		await page.goto('/');
		const description = await page.locator('meta[name="description"]').getAttribute('content');
		expect(description?.length ?? 0).toBeGreaterThan(0);
		expect(description).toMatch(/frontend developer/i);
	});

	test('emits one alternate hreflang per supported locale (HTTP Link header — next-intl convention)', async ({ page }) => {
		const response = await page.goto('/');
		const linkHeader = response?.headers()['link'] ?? null;
		const links = parseLinkHeader(linkHeader);
		const alternates = links.filter((l) => l.rel === 'alternate' && l.hreflang);
		const foundSet = new Set(alternates.map((a) => a.hreflang!));

		for (const locale of LOCALE_CODES) {
			expect(foundSet, `missing hreflang="${locale}" in Link header`).toContain(locale);
		}
		// x-default is conditional on the request's entry point — present when navigating to `/`
		// without a locale cookie, sometimes omitted after middleware redirects. Assert as soft.
		if (foundSet.has('x-default')) {
			expect(alternates.find((a) => a.hreflang === 'x-default')?.url).toMatch(/^https?:\/\//);
		}
	});

	test('hreflang URLs in Link header are absolute (canonical-equivalent for the en self-reference)', async ({ page }) => {
		const response = await page.goto('/');
		const linkHeader = response?.headers()['link'] ?? null;
		const links = parseLinkHeader(linkHeader);
		const enAlternate = links.find((l) => l.rel === 'alternate' && l.hreflang === 'en');
		expect(enAlternate, 'expected an alternate hreflang="en" entry in the Link header').toBeDefined();
		expect(enAlternate?.url).toMatch(/^https?:\/\//);
	});

	test('renders a Person JSON-LD payload with legalName + brand name', async ({ page }) => {
		await page.goto('/');
		const blocks = await page.$$eval('script[type="application/ld+json"]', (els) => els.map((el) => el.textContent ?? ''));
		expect(blocks.length).toBeGreaterThan(0);

		const personBlock = blocks
			.map((raw) => {
				try {
					return JSON.parse(raw) as Record<string, unknown>;
				} catch {
					return null;
				}
			})
			.find((parsed) => parsed?.['@type'] === 'Person');

		expect(personBlock, 'expected a Person JSON-LD payload').toBeDefined();
		expect(personBlock?.legalName).toBe('Mozammel Ali');
		expect(personBlock?.name).toBe('Sapan Mozammel');
	});
});
