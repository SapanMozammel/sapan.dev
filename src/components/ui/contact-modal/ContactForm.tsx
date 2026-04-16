'use client';

import { Button } from '@/components/layout/common/Button';
import FormField from '@/components/ui/form-field';
import type { ContactFormProps } from '@/types/contact';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { memo } from 'react';

const Turnstile = dynamic(() => import('@marsidev/react-turnstile').then((mod) => mod.Turnstile), { ssr: false });

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

const ContactForm = memo<ContactFormProps>(({ form, errors, onChange, onSubmit, onTurnstileToken }) => {
	const translateLabels = useTranslations('common.contact.form.labels');
	const translateForm = useTranslations('common.contact.form');

	return (
		<form onSubmit={onSubmit} className='flex flex-col gap-4' noValidate>
			<div className='flex flex-col gap-4 sm:flex-row'>
				<FormField label={translateLabels('name')} name='name' value={form.name} error={errors.name} onChange={onChange} placeholder='John Doe' autoComplete='name' className='flex-1' />
				<FormField label={translateLabels('email')} name='email' type='email' value={form.email} error={errors.email} onChange={onChange} placeholder='john@example.com' autoComplete='email' className='flex-1' />
			</div>
			<FormField label={translateLabels('title')} name='title' value={form.title} error={errors.title} onChange={onChange} placeholder='e.g. Landing page redesign' />
			<FormField label={translateLabels('message')} name='message' type='textarea' value={form.message} error={errors.message} onChange={onChange} placeholder='Tell me about your project...' rows={3} />

			<input type='text' name='website' value={form.website} onChange={onChange} tabIndex={-1} autoComplete='off' aria-hidden className='pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0' />

			<Turnstile siteKey={TURNSTILE_SITE_KEY} onSuccess={onTurnstileToken} options={{ appearance: 'interaction-only', theme: 'auto' }} />

			<Button fill gradient className='mt-1 w-full justify-center' disabled={!form.turnstileToken}>
				{translateForm('submit')}
			</Button>
		</form>
	);
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;
