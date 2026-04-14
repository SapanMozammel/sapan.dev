'use client';

import { cn } from '@/lib/utils';
import type { FormFieldProps } from '@/types/form-field';
import { memo } from 'react';

const INPUT_BASE =
	'font-dm text-dark dark:text-white w-full rounded-md border bg-transparent px-3 py-2.5 text-sm font-normal leading-tight outline-none transition-colors duration-150 placeholder:text-secondary-600/50 dark:placeholder:text-secondary-400/50 focus:ring-0';
const INPUT_BORDER = 'border-secondary-200 dark:border-secondary-700 focus:border-primary dark:focus:border-success';
const INPUT_ERROR = 'border-danger dark:border-danger';

const FormField = memo<FormFieldProps>(({ label, name, value, error, onChange, type = 'text', placeholder, autoComplete, rows = 3, className }) => {
	const borderClass = error ? INPUT_ERROR : INPUT_BORDER;

	return (
		<fieldset className={cn('flex flex-col gap-2', className)}>
			<label className='text-label-large text-secondary-500 dark:text-secondary-500'>{label}</label>
			{type === 'textarea' ? (
				<textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows} className={cn(INPUT_BASE, 'leading-relaxed', borderClass)} />
			) : (
				<input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} className={cn(INPUT_BASE, borderClass)} />
			)}
			{error ? <p className='font-dm text-danger text-xs leading-none'>{error}</p> : null}
		</fieldset>
	);
});

FormField.displayName = 'FormField';

export default FormField;
