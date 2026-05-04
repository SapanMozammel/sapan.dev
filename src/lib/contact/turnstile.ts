import { env } from '@/lib/env.server';

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

type TurnstileResponse = {
	success: boolean;
	'error-codes'?: string[];
};

export const verifyTurnstile = async (token: string | undefined, ip: string | undefined): Promise<boolean> => {
	if (!token) return false;

	const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
	if (ip) body.append('remoteip', ip);

	try {
		const res = await fetch(VERIFY_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body,
		});
		if (!res.ok) return false;
		const data = (await res.json()) as TurnstileResponse;
		return data.success === true;
	} catch {
		return false;
	}
};
