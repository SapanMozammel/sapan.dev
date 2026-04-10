'use client';

import { Button } from '@/components/layout/common/Button';
import { IconAlertTriangle, IconLoader, IconSend } from '@tabler/icons-react';
import { memo } from 'react';

export const ContactLoading = memo(() => {
	return (
		<div className='flex flex-col items-center gap-4 pt-8 pb-12 text-center'>
			<IconLoader className='text-primary dark:text-success h-8 w-8 animate-spin' />
			<p className='font-dm text-secondary-600 dark:text-secondary-400 text-sm tracking-wide'>Sending your message...</p>
		</div>
	);
});

ContactLoading.displayName = 'ContactLoading';

export const ContactSuccess = memo<{ onClose: () => void }>(({ onClose }) => {
	return (
		<div className='flex flex-col items-center gap-3 py-6 text-center'>
			<div className='bg-success flex h-14 w-14 items-center justify-center rounded-xl'>
				<IconSend className='text-dark h-6 w-6' />
			</div>
			<h4 className='font-hg text-dark text-xl !leading-tight font-medium tracking-wide dark:text-white'>Message sent!</h4>
			<p className='font-dm text-secondary-600 dark:text-secondary-400 text-sm leading-relaxed tracking-wide'>Thanks for reaching out. I&apos;ll be in touch soon.</p>
			<Button className='mt-4' onClick={onClose}>
				Close
			</Button>
		</div>
	);
});

ContactSuccess.displayName = 'ContactSuccess';

export const ContactError = memo<{ onRetry: () => void }>(({ onRetry }) => {
	return (
		<div className='flex flex-col items-center gap-3 py-6 text-center'>
			<div className='bg-danger/10 flex h-14 w-14 items-center justify-center rounded-xl'>
				<IconAlertTriangle className='text-danger h-6 w-6' />
			</div>
			<h4 className='font-hg text-dark text-xl !leading-tight font-medium tracking-wide dark:text-white'>Something went wrong</h4>
			<p className='font-dm text-secondary-600 dark:text-secondary-400 text-sm leading-relaxed tracking-wide'>Please try again or reach out via email.</p>
			<Button className='mt-4' onClick={onRetry}>
				Try Again
			</Button>
		</div>
	);
});

ContactError.displayName = 'ContactError';
