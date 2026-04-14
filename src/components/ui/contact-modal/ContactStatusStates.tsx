'use client';

import { Button } from '@/components/layout/common/Button';
import StatusMessage from '@/components/ui/status-message';
import { IconAlertTriangle, IconLoader, IconSend } from '@tabler/icons-react';
import { memo } from 'react';

export const ContactLoading = memo(() => (
	<div className='flex flex-col items-center gap-4 pt-8 pb-12 text-center'>
		<IconLoader className='text-primary dark:text-success h-8 w-8 animate-spin' />
		<p className='text-paragraph-small text-secondary-600 dark:text-secondary-400 tracking-wide'>Sending your message...</p>
	</div>
));

ContactLoading.displayName = 'ContactLoading';

export const ContactSuccess = memo<{ onClose: () => void }>(({ onClose }) => (
	<StatusMessage icon={<IconSend className='text-dark h-6 w-6' />} iconBg='bg-success' title='Message sent!' description="Thanks for reaching out. I'll be in touch soon.">
		<Button className='mt-4' onClick={onClose}>
			Close
		</Button>
	</StatusMessage>
));

ContactSuccess.displayName = 'ContactSuccess';

export const ContactError = memo<{ onRetry: () => void }>(({ onRetry }) => (
	<StatusMessage icon={<IconAlertTriangle className='text-danger h-6 w-6' />} iconBg='bg-danger/10' title='Something went wrong' description='Please try again or reach out via email.'>
		<Button className='mt-4' onClick={onRetry}>
			Try Again
		</Button>
	</StatusMessage>
));

ContactError.displayName = 'ContactError';
