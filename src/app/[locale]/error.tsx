'use client';

import type { ErrorProps } from '@/types/error';
import { useEffect } from 'react';

const Error = ({ error, reset }: ErrorProps) => {
	useEffect(() => {
		// Log the error to an error reporting service
		// In production, you would send this to your error tracking service
		if (process.env.NODE_ENV === 'development') {
			// eslint-disable-next-line no-console
			console.error('Application error:', error);
		}
	}, [error]);

	return (
		<div className='flex min-h-screen flex-col items-center justify-center px-4'>
			<div className='text-center'>
				<h1 className='text-danger text-4xl font-bold'>Something went wrong!</h1>
				<p className='text-secondary-500 dark:text-secondary-500 mt-4'>{error.message || 'An unexpected error occurred. This might be due to a temporary server issue.'}</p>
				<div className='mt-6 flex justify-center gap-4'>
					<button onClick={reset} className='bg-primary dark:bg-success dark:text-dark rounded-md px-6 py-3 text-white transition-colors hover:opacity-90'>
						Try again
					</button>
					<button onClick={() => window.location.reload()} className='bg-secondary-600 rounded-md px-6 py-3 text-white transition-colors hover:opacity-90'>
						Reload page
					</button>
				</div>
				{process.env.NODE_ENV === 'development' && (
					<details className='mt-6 text-start'>
						<summary className='text-secondary-500 cursor-pointer text-sm'>Error details (development only)</summary>
						<pre className='bg-secondary-100 dark:bg-secondary-800 mt-2 overflow-auto rounded p-4 text-xs'>{error.stack}</pre>
					</details>
				)}
			</div>
		</div>
	);
};

export default Error;
