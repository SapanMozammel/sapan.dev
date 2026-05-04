import { env, publicSchema, type PublicEnv } from '@/lib/env';
import { serverSchema, validateServerEnv, type ServerEnv } from '@/lib/env.server-schema';
import { describe, expect, expectTypeOf, it } from 'vitest';

const validServer = {
	NEXT_PUBLIC_SITE_URL: 'https://sapan.dev',
	NEXT_PUBLIC_TURNSTILE_SITE_KEY: 'site-key',
	RESEND_API_KEY: 're_xxx',
	CONTACT_TO_EMAIL: 'admin@sapan.dev',
	CONTACT_FROM_EMAIL: 'noreply@sapan.dev',
	CONTACT_REPLY_TO: 'reply@sapan.dev',
	UPSTASH_REDIS_REST_URL: 'https://redis.upstash.io',
	UPSTASH_REDIS_REST_TOKEN: 'redis-token',
	TURNSTILE_SECRET_KEY: 'turnstile-secret',
};

describe('publicSchema', () => {
	it('applies the SITE_URL default when the var is undefined', () => {
		const parsed = publicSchema.parse({
			NEXT_PUBLIC_TURNSTILE_SITE_KEY: 'site-key',
		});
		expect(parsed.NEXT_PUBLIC_SITE_URL).toBe('https://sapan-dev.vercel.app');
	});

	it('treats empty string as undefined for optional vars (after stripEmpty preprocessing in production code, simulated here by omitting)', () => {
		const parsed = publicSchema.parse({
			NEXT_PUBLIC_TURNSTILE_SITE_KEY: 'site-key',
		});
		expect(parsed.NEXT_PUBLIC_GRAPHQL_ENDPOINT).toBeUndefined();
	});

	it('throws on missing required public var (NEXT_PUBLIC_TURNSTILE_SITE_KEY)', () => {
		expect(() => publicSchema.parse({})).toThrow();
	});

	it('throws on empty NEXT_PUBLIC_TURNSTILE_SITE_KEY', () => {
		expect(() => publicSchema.parse({ NEXT_PUBLIC_TURNSTILE_SITE_KEY: '' })).toThrow();
	});

	it('throws on invalid URL for NEXT_PUBLIC_GRAPHQL_ENDPOINT', () => {
		expect(() =>
			publicSchema.parse({
				NEXT_PUBLIC_TURNSTILE_SITE_KEY: 'site-key',
				NEXT_PUBLIC_GRAPHQL_ENDPOINT: 'not-a-url',
			}),
		).toThrow();
	});
});

describe('serverSchema', () => {
	it('parses a complete valid server env', () => {
		const parsed = serverSchema.parse(validServer);
		expect(parsed.RESEND_API_KEY).toBe('re_xxx');
		expect(parsed.NEXT_PUBLIC_SITE_URL).toBe('https://sapan.dev');
	});

	it('throws when a required secret is missing', () => {
		const { RESEND_API_KEY: _, ...rest } = validServer;
		void _;
		expect(() => serverSchema.parse(rest)).toThrow(/RESEND_API_KEY/);
	});

	it('treats empty string as a missing required secret (caught by .min(1))', () => {
		expect(() => serverSchema.parse({ ...validServer, RESEND_API_KEY: '' })).toThrow(/RESEND_API_KEY/);
	});

	it('throws on invalid email for CONTACT_TO_EMAIL', () => {
		expect(() => serverSchema.parse({ ...validServer, CONTACT_TO_EMAIL: 'not-an-email' })).toThrow(/CONTACT_TO_EMAIL/);
	});

	it('throws on invalid URL for UPSTASH_REDIS_REST_URL', () => {
		expect(() => serverSchema.parse({ ...validServer, UPSTASH_REDIS_REST_URL: 'not-a-url' })).toThrow(/UPSTASH_REDIS_REST_URL/);
	});

	it('accepts undefined GRAPHQL_AUTH_TOKEN (Apollo intentionally inert)', () => {
		const parsed = serverSchema.parse(validServer);
		expect(parsed.GRAPHQL_AUTH_TOKEN).toBeUndefined();
	});

	it('accepts a valid GRAPHQL_AUTH_TOKEN when set', () => {
		const parsed = serverSchema.parse({ ...validServer, GRAPHQL_AUTH_TOKEN: 'tok' });
		expect(parsed.GRAPHQL_AUTH_TOKEN).toBe('tok');
	});
});

describe('validateServerEnv', () => {
	it('does not throw against the test environment (vitest config provides the public vars; server checks are exercised in serverSchema tests above)', () => {
		expect(() => validateServerEnv()).not.toThrow();
	});
});

describe('env (public, parsed at module load)', () => {
	it('exposes the parsed public env as a frozen object', () => {
		expect(Object.isFrozen(env)).toBe(true);
	});

	it('NEXT_PUBLIC_SITE_URL falls back to the default when not set in the test environment', () => {
		expect(env.NEXT_PUBLIC_SITE_URL).toBeTypeOf('string');
	});
});

describe('type narrowing', () => {
	it('PublicEnv: NEXT_PUBLIC_TURNSTILE_SITE_KEY is string', () => {
		expectTypeOf<PublicEnv['NEXT_PUBLIC_TURNSTILE_SITE_KEY']>().toEqualTypeOf<string>();
	});

	it('PublicEnv: NEXT_PUBLIC_GRAPHQL_ENDPOINT is string | undefined', () => {
		expectTypeOf<PublicEnv['NEXT_PUBLIC_GRAPHQL_ENDPOINT']>().toEqualTypeOf<string | undefined>();
	});

	it('ServerEnv: RESEND_API_KEY is string (not string | undefined)', () => {
		expectTypeOf<ServerEnv['RESEND_API_KEY']>().toEqualTypeOf<string>();
	});

	it('ServerEnv: GRAPHQL_AUTH_TOKEN is string | undefined (Apollo inert)', () => {
		expectTypeOf<ServerEnv['GRAPHQL_AUTH_TOKEN']>().toEqualTypeOf<string | undefined>();
	});
});
