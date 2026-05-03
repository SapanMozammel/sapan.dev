import { test as base, expect, type Page } from '@playwright/test';

type ContactMode = 'success' | 'error';

type GraphQLOperationResponse = Record<string, unknown>;
type GraphQLOperationMap = Record<string, GraphQLOperationResponse>;

type SapanFixtures = {
	mockContact: (mode: ContactMode) => Promise<void>;
	mockTurnstile: () => Promise<void>;
	setLocale: (locale: string) => Promise<void>;
	mockGraphQL: (operations: GraphQLOperationMap) => Promise<void>;
};

export const test = base.extend<SapanFixtures>({
	page: async ({ page }, use) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		const originalGoto = page.goto.bind(page);
		page.goto = (async (url: string, options?: Parameters<typeof originalGoto>[1]) => {
			return originalGoto(url, { waitUntil: 'domcontentloaded', ...options });
		}) as typeof page.goto;
		await use(page);
	},

	mockContact: async ({ page }, use) => {
		const installer = async (mode: ContactMode) => {
			await page.route('**/api/contact', async (route) => {
				if (mode === 'success') {
					await route.fulfill({
						status: 200,
						contentType: 'application/json',
						body: JSON.stringify({ ok: true, id: 'mock-message-id' }),
					});
					return;
				}
				await route.fulfill({
					status: 500,
					contentType: 'application/json',
					body: JSON.stringify({ ok: false, error: 'Mocked Resend failure' }),
				});
			});
		};
		await use(installer);
	},

	mockTurnstile: async ({ page }, use) => {
		const installer = async () => {
			await page.addInitScript(() => {
				const stub = {
					render: (_container: unknown, params?: { callback?: (token: string) => void }) => {
						if (params && typeof params.callback === 'function') {
							setTimeout(() => params.callback?.('mock-turnstile-token'), 0);
						}
						return 'mock-widget-id';
					},
					execute: () => Promise.resolve('mock-turnstile-token'),
					reset: () => {},
					remove: () => {},
					getResponse: () => 'mock-turnstile-token',
				};
				Object.defineProperty(window, 'turnstile', { value: stub, configurable: true, writable: true });
			});
			await page.route('**/turnstile/**', async (route) => {
				const url = route.request().url();
				if (url.endsWith('.js') || url.includes('api.js')) {
					await route.fulfill({
						status: 200,
						contentType: 'application/javascript',
						body: '/* mocked by e2e fixtures */',
					});
					return;
				}
				await route.fulfill({
					status: 200,
					contentType: 'application/json',
					body: JSON.stringify({ success: true, token: 'mock-turnstile-token' }),
				});
			});
		};
		await use(installer);
	},

	setLocale: async ({ page }, use) => {
		const installer = async (locale: string) => {
			const path = locale === 'en' ? '/' : `/${locale}`;
			await page.context().addCookies([
				{ name: 'NEXT_LOCALE', value: locale, url: page.url() === 'about:blank' ? `http://localhost:8001${path}` : page.url() },
			]);
			await page.goto(path);
		};
		await use(installer);
	},

	mockGraphQL: async ({ page }, use) => {
		const installer = async (operations: GraphQLOperationMap) => {
			const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
			const route = endpoint ? endpoint : '**/graphql';
			await page.route(route, async (handler) => {
				const request = handler.request();
				if (request.method() !== 'POST') {
					await handler.continue();
					return;
				}
				const body = request.postDataJSON() as { operationName?: string } | null;
				const operationName = body?.operationName ?? '';
				const data = operations[operationName];
				if (!data) {
					await handler.fulfill({
						status: 404,
						contentType: 'application/json',
						body: JSON.stringify({ errors: [{ message: `[mockGraphQL] no mock registered for operation "${operationName}"` }] }),
					});
					return;
				}
				await handler.fulfill({
					status: 200,
					contentType: 'application/json',
					body: JSON.stringify({ data }),
				});
			});
		};
		await use(installer);
	},
});

export { expect, type Page };
