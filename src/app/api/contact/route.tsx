import ContactAdminEmail from '@/emails/ContactAdminEmail';
import ContactAutoReply from '@/emails/ContactAutoReply';
import { ratelimit } from '@/lib/contact/ratelimit';
import { resend } from '@/lib/contact/resend';
import { contactSchema } from '@/lib/contact/schema';
import { verifyTurnstile } from '@/lib/contact/turnstile';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 8 * 1024;

export const POST = async (req: Request) => {
	const contentLength = Number(req.headers.get('content-length') ?? 0);
	if (contentLength > MAX_BODY_BYTES) {
		return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
	}

	const body = await req.json().catch(() => null);
	if (!body || typeof body !== 'object') {
		return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
	}

	if ((body as { website?: unknown }).website) {
		return NextResponse.json({ ok: true });
	}

	const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'anonymous';

	const { success: withinLimit } = await ratelimit.limit(ip);
	if (!withinLimit) {
		return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
	}

	const turnstileToken = (body as { turnstileToken?: unknown }).turnstileToken;
	const tokenOk = await verifyTurnstile(typeof turnstileToken === 'string' ? turnstileToken : undefined, ip);
	if (!tokenOk) {
		return NextResponse.json({ error: 'Captcha failed' }, { status: 403 });
	}

	const parsed = contactSchema.safeParse(body);
	if (!parsed.success) {
		return NextResponse.json({ error: 'Invalid fields' }, { status: 400 });
	}
	const { name, email, title, message } = parsed.data;

	const toEmail = process.env.CONTACT_TO_EMAIL!;
	const fromEmail = process.env.CONTACT_FROM_EMAIL!;
	const replyTo = process.env.CONTACT_REPLY_TO!;

	const adminResult = await resend.emails.send({
		from: `"Contact Form" <${fromEmail}>`,
		to: toEmail,
		replyTo: email,
		subject: `[sapan-dev] ${title}`,
		react: <ContactAdminEmail name={name} email={email} title={title} message={message} />,
	});

	if (adminResult.error) {
		console.error('[contact] admin email failed:', adminResult.error);
		return NextResponse.json({ error: 'Send failed' }, { status: 502 });
	}

	const autoReplyResult = await resend.emails.send({
		from: `"Sapan Mozammel" <${fromEmail}>`,
		to: email,
		replyTo,
		subject: 'Thanks for reaching out',
		react: <ContactAutoReply name={name} />,
	});

	if (autoReplyResult.error) {
		console.warn('[contact] auto-reply failed (non-fatal):', autoReplyResult.error);
	}

	return NextResponse.json({ ok: true });
};
