'use client';

import { Button } from '@/components/layout/common/Button';
import FormField from '@/components/ui/form-field';
import type { ContactFormProps } from '@/types/contact';
import { memo } from 'react';

const ContactForm = memo<ContactFormProps>(({ form, errors, onChange, onSubmit }) => {
	return (
		<form onSubmit={onSubmit} className='flex flex-col gap-4' noValidate>
			<div className='flex flex-col gap-4 sm:flex-row'>
				<FormField label='Name' name='name' value={form.name} error={errors.name} onChange={onChange} placeholder='John Doe' autoComplete='name' className='flex-1' />
				<FormField label='Email' name='email' type='email' value={form.email} error={errors.email} onChange={onChange} placeholder='john@example.com' autoComplete='email' className='flex-1' />
			</div>
			<FormField label='Title' name='title' value={form.title} error={errors.title} onChange={onChange} placeholder='e.g. Landing page redesign' />
			<FormField label='Message' name='message' type='textarea' value={form.message} error={errors.message} onChange={onChange} placeholder='Tell me about your project...' rows={3} />

			<Button fill gradient className='mt-1 w-full justify-center'>
				Send Message
			</Button>
		</form>
	);
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;
