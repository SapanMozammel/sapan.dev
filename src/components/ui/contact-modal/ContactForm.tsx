'use client';

import { Button } from '@/components/layout/common/Button';
import { cn } from '@/lib/utils';
import type { ContactFormProps } from '@/types/contact';
import { memo } from 'react';

const INPUT_BASE =
	'font-sora text-dark dark:text-white w-full rounded-md border bg-transparent px-3 py-2.5 text-sm font-normal leading-tight outline-none transition-colors duration-150 placeholder:text-secondary-600/50 dark:placeholder:text-secondary-400/50 focus:ring-0';
const INPUT_BORDER = 'border-secondary-200 dark:border-secondary-700 focus:border-primary dark:focus:border-success';
const INPUT_ERROR = 'border-danger dark:border-danger';

const ContactForm = memo<ContactFormProps>(({ form, errors, onChange, onSubmit }) => {
	return (
		<form onSubmit={onSubmit} className='flex flex-col gap-4' noValidate>
			<div className='flex flex-col gap-4 sm:flex-row'>
				<fieldset className='flex flex-1 flex-col gap-2'>
					<label className='text-secondary-500 dark:text-secondary-500 text-sm leading-none font-medium tracking-wider uppercase'>Name</label>
					<input type='text' name='name' value={form.name} onChange={onChange} placeholder='John Doe' autoComplete='name' className={cn(INPUT_BASE, errors.name ? INPUT_ERROR : INPUT_BORDER)} />
					{errors.name ? <p className='text-danger text-xs leading-none'>{errors.name}</p> : null}
				</fieldset>
				<fieldset className='flex flex-1 flex-col gap-2'>
					<label className='text-secondary-500 dark:text-secondary-500 text-sm leading-none font-medium tracking-wider uppercase'>Email</label>
					<input type='email' name='email' value={form.email} onChange={onChange} placeholder='john@example.com' autoComplete='email' className={cn(INPUT_BASE, errors.email ? INPUT_ERROR : INPUT_BORDER)} />
					{errors.email ? <p className='text-danger text-xs leading-none'>{errors.email}</p> : null}
				</fieldset>
			</div>
			<fieldset className='flex flex-col gap-2'>
				<label className='text-secondary-500 dark:text-secondary-500 text-sm leading-none font-medium tracking-wider uppercase'>Title</label>
				<input type='text' name='title' value={form.title} onChange={onChange} placeholder='e.g. Landing page redesign' className={cn(INPUT_BASE, errors.title ? INPUT_ERROR : INPUT_BORDER)} />
				{errors.title ? <p className='text-danger text-xs leading-none'>{errors.title}</p> : null}
			</fieldset>
			<fieldset className='flex flex-col gap-2'>
				<label className='text-secondary-500 dark:text-secondary-500 text-sm leading-none font-medium tracking-wider uppercase'>Message</label>
				<textarea
					name='message'
					value={form.message}
					onChange={onChange}
					placeholder='Tell me about your project...'
					rows={3}
					className={cn(INPUT_BASE, 'leading-relaxed', errors.message ? INPUT_ERROR : INPUT_BORDER)}
				/>
				{errors.message ? <p className='text-danger text-xs leading-none'>{errors.message}</p> : null}
			</fieldset>

			<Button fill gradient className='mt-1 w-full justify-center'>
				Send Message
			</Button>
		</form>
	);
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;
