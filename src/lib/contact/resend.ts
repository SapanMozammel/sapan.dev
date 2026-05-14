import { env } from '@/lib/env.server';
import { Resend } from 'resend';

let _resend: Resend | undefined;

export const getResend = (): Resend => {
	if (!_resend) _resend = new Resend(env.RESEND_API_KEY);
	return _resend;
};
