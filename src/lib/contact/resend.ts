import { env } from '@/lib/env.server';
import { Resend } from 'resend';

const globalForResend = globalThis as unknown as { resend?: Resend };

export const resend = globalForResend.resend ?? new Resend(env.RESEND_API_KEY);

if (process.env.NODE_ENV !== 'production') {
	globalForResend.resend = resend;
}
