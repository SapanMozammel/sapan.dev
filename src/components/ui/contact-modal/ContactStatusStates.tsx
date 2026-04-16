'use client';

import { Button } from '@/components/layout/common/Button';
import StatusMessage from '@/components/ui/status-message';
import { IconAlertTriangle, IconLoader, IconSend } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

export const ContactLoading = memo(() => {
	const translateStatus = useTranslations('common.contact.status');

	return (
		<div className='flex flex-col items-center gap-4 pt-8 pb-12 text-center'>
			<IconLoader className='text-primary dark:text-success h-8 w-8 animate-spin' />
			<p className='text-paragraph-small text-secondary-600 dark:text-secondary-400 tracking-wide'>{translateStatus('loading')}</p>
		</div>
	);
});

ContactLoading.displayName = 'ContactLoading';

export const ContactSuccess = memo<{ onClose: () => void }>(({ onClose }) => {
	const translateStatus = useTranslations('common.contact.status');
	const translateButtons = useTranslations('common.buttons');

	return (
		<StatusMessage icon={<IconSend className='text-dark h-6 w-6' />} iconBg='bg-success' title={translateStatus('successTitle')} description={translateStatus('successDescription')}>
			<Button className='mt-4' onClick={onClose}>
				{translateButtons('close')}
			</Button>
		</StatusMessage>
	);
});

ContactSuccess.displayName = 'ContactSuccess';

export const ContactError = memo<{ onRetry: () => void }>(({ onRetry }) => {
	const translateStatus = useTranslations('common.contact.status');
	const translateButtons = useTranslations('common.buttons');

	return (
		<StatusMessage icon={<IconAlertTriangle className='text-danger h-6 w-6' />} iconBg='bg-danger/10' title={translateStatus('errorTitle')} description={translateStatus('errorDescription')}>
			<Button className='mt-4' onClick={onRetry}>
				{translateButtons('tryAgain')}
			</Button>
		</StatusMessage>
	);
});

ContactError.displayName = 'ContactError';
