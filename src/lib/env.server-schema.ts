// next.config.ts compiles this file via Node CJS, which does NOT resolve TS path aliases.
// Use relative import for the env.ts dependency so build-time loading works.
import { publicSchema, stripEmpty } from './env';
import { z } from 'zod';

export const serverSchema = publicSchema.extend({
	RESEND_API_KEY: z.string().min(1),
	CONTACT_TO_EMAIL: z.string().email(),
	CONTACT_FROM_EMAIL: z.string().email(),
	CONTACT_REPLY_TO: z.string().email(),
	UPSTASH_REDIS_REST_URL: z.string().url(),
	UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
	TURNSTILE_SECRET_KEY: z.string().min(1),
	GRAPHQL_AUTH_TOKEN: z.string().min(1).optional(),
});

export type ServerEnv = z.infer<typeof serverSchema>;

export const validateServerEnv = (): void => {
	serverSchema.parse(stripEmpty(process.env));
};
