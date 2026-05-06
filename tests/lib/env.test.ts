import { env, type PublicEnv } from '@/lib/env';
import { describe, expect, expectTypeOf, it } from 'vitest';

describe('env (public, parsed at module load)', () => {
	it('exposes the parsed public env as a frozen object', () => {
		expect(Object.isFrozen(env)).toBe(true);
	});

	it('NEXT_PUBLIC_SITE_URL falls back to the default when not set', () => {
		expect(env.NEXT_PUBLIC_SITE_URL).toBeTypeOf('string');
		expect(env.NEXT_PUBLIC_SITE_URL.length).toBeGreaterThan(0);
	});
});

describe('type narrowing', () => {
	it('PublicEnv: NEXT_PUBLIC_TURNSTILE_SITE_KEY is string', () => {
		expectTypeOf<PublicEnv['NEXT_PUBLIC_TURNSTILE_SITE_KEY']>().toEqualTypeOf<string>();
	});

	it('PublicEnv: NEXT_PUBLIC_GRAPHQL_ENDPOINT is string | undefined', () => {
		expectTypeOf<PublicEnv['NEXT_PUBLIC_GRAPHQL_ENDPOINT']>().toEqualTypeOf<string | undefined>();
	});
});
