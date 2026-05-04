import { z } from 'zod';

const DEFAULT_SITE_URL = 'https://sapan-dev.vercel.app';

export const stripEmpty = (input: NodeJS.ProcessEnv): Record<string, string | undefined> => Object.fromEntries(Object.entries(input).map(([k, v]) => [k, v === '' ? undefined : v]));

export const publicSchema = z.object({
	NEXT_PUBLIC_SITE_URL: z.string().url().optional().default(DEFAULT_SITE_URL),
	NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1),
	NEXT_PUBLIC_GRAPHQL_ENDPOINT: z.string().url().optional(),
});

export type PublicEnv = z.infer<typeof publicSchema>;

export const env: Readonly<PublicEnv> = Object.freeze(publicSchema.parse(stripEmpty(process.env)));
