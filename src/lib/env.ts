const DEFAULT_SITE_URL = 'https://sapan-dev.vercel.app';

const read = (key: string): string | undefined => {
	const v = process.env[key];
	return v === undefined || v === '' ? undefined : v;
};

export type PublicEnv = {
	NEXT_PUBLIC_SITE_URL: string;
	NEXT_PUBLIC_TURNSTILE_SITE_KEY: string;
	NEXT_PUBLIC_GRAPHQL_ENDPOINT: string | undefined;
};

export const env: Readonly<PublicEnv> = Object.freeze({
	NEXT_PUBLIC_SITE_URL: read('NEXT_PUBLIC_SITE_URL') ?? DEFAULT_SITE_URL,
	NEXT_PUBLIC_TURNSTILE_SITE_KEY: read('NEXT_PUBLIC_TURNSTILE_SITE_KEY') ?? '',
	NEXT_PUBLIC_GRAPHQL_ENDPOINT: read('NEXT_PUBLIC_GRAPHQL_ENDPOINT'),
});
