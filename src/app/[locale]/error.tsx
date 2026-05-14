'use client';

import { Button } from '@/components/layout/common/button';
import { useTranslations } from 'next-intl';
import { memo, useEffect } from 'react';

type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

const Error = memo(({ error, reset }: ErrorProps) => {
	const translateError = useTranslations('common.error');
	const translateButtons = useTranslations('common.buttons');

	useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			// eslint-disable-next-line no-console
			console.error('Application error:', error);
		}
	}, [error]);

	return (
		<div className='relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4'>
			<div className='glow-blob-danger pointer-events-none absolute top-1/2 left-1/2 -translate-1/2 rounded-full' />
			<div className='relative z-10 text-center'>
				<p className='text-danger text-heading-xsmall tracking-[0.3em] uppercase'>{translateError('label')}</p>
				<h1 className='font-cg text-dark mt-2 text-3xl leading-none font-medium sm:text-5xl dark:text-white'>{translateError('title')}</h1>
				<p className='text-paragraph-medium text-secondary-600 dark:text-secondary-400 mx-auto mt-3'>{error.message || translateError('defaultMessage')}</p>
				<div className='mt-8 flex justify-center gap-3'>
					<Button fill onClick={reset}>
						{translateButtons('tryAgain')}
					</Button>
					<Button onClick={() => window.location.reload()}>{translateButtons('reload')}</Button>
				</div>
				{process.env.NODE_ENV === 'development' && (
					<details className='mt-8 text-start'>
						<summary className='text-secondary-600 dark:text-secondary-400 cursor-pointer text-sm'>Error details (dev only)</summary>
						<pre className='bg-secondary-100 dark:bg-secondary-800 mt-2 overflow-auto rounded-lg p-4 text-xs'>{error.stack}</pre>
					</details>
				)}
			</div>
		</div>
	);
});

Error.displayName = 'Error';

export default Error;
