import 'server-only';

import { env as publicEnv, type PublicEnv } from '@/lib/env';

const read = (key: string): string | undefined => {
	const v = process.env[key];
	return v === undefined || v === '' ? undefined : v;
};

export type ServerEnv = PublicEnv & {
	RESEND_API_KEY: string;
	CONTACT_TO_EMAIL: string;
	CONTACT_FROM_EMAIL: string;
	CONTACT_REPLY_TO: string;
	UPSTASH_REDIS_REST_URL: string;
	UPSTASH_REDIS_REST_TOKEN: string;
	TURNSTILE_SECRET_KEY: string;
	GRAPHQL_AUTH_TOKEN: string | undefined;
};

export const env: Readonly<ServerEnv> = Object.freeze({
	...publicEnv,
	RESEND_API_KEY: read('RESEND_API_KEY') ?? '',
	CONTACT_TO_EMAIL: read('CONTACT_TO_EMAIL') ?? '',
	CONTACT_FROM_EMAIL: read('CONTACT_FROM_EMAIL') ?? '',
	CONTACT_REPLY_TO: read('CONTACT_REPLY_TO') ?? '',
	UPSTASH_REDIS_REST_URL: read('UPSTASH_REDIS_REST_URL') ?? '',
	UPSTASH_REDIS_REST_TOKEN: read('UPSTASH_REDIS_REST_TOKEN') ?? '',
	TURNSTILE_SECRET_KEY: read('TURNSTILE_SECRET_KEY') ?? '',
	GRAPHQL_AUTH_TOKEN: read('GRAPHQL_AUTH_TOKEN'),
});
