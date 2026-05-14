import { expect, test } from './fixtures';

test.describe('security headers', () => {
	test('emits the 6 always-on baseline security headers on the home route', async ({ request }) => {
		const res = await request.get('/');
		const headers = res.headers();

		expect(headers['x-content-type-options']).toBe('nosniff');
		expect(headers['x-frame-options']).toBe('DENY');
		expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
		expect(headers['permissions-policy']).toContain('camera=()');
		expect(headers['permissions-policy']).toContain('microphone=()');
		expect(headers['permissions-policy']).toContain('geolocation=()');
		expect(headers['permissions-policy']).toContain('interest-cohort=()');
		expect(headers['cross-origin-opener-policy']).toBe('same-origin');
		expect(headers['cross-origin-resource-policy']).toBe('same-origin');
	});

	test('omits Strict-Transport-Security in dev (production gating works)', async ({ request }) => {
		const res = await request.get('/');
		expect(res.headers()['strict-transport-security']).toBeUndefined();
	});
});
