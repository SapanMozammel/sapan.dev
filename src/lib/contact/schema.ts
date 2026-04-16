import { z } from 'zod';

export const contactSchema = z.object({
	name: z.string().trim().min(1).max(100),
	email: z.string().trim().email().max(200),
	title: z.string().trim().min(1).max(200),
	message: z.string().trim().min(1).max(5000),
	website: z.literal(''),
	turnstileToken: z.string().min(1).max(2048),
});

export type ContactPayload = z.infer<typeof contactSchema>;
