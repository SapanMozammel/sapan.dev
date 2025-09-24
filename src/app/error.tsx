'use client';

import { useEffect } from 'react';

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

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
				<h1 className='text-4xl font-bold text-red-600 dark:text-red-400'>Something went wrong!</h1>
				<p className='mt-4 text-gray-600 dark:text-gray-400'>{error.message || 'An unexpected error occurred. This might be due to a temporary server issue.'}</p>
				<div className='mt-6 flex justify-center gap-4'>
					<button onClick={reset} className='rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'>
						Try again
					</button>
					<button onClick={() => window.location.reload()} className='rounded-md bg-gray-600 px-6 py-3 text-white transition-colors hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600'>
						Reload page
					</button>
				</div>
				{process.env.NODE_ENV === 'development' && (
					<details className='mt-6 text-left'>
						<summary className='cursor-pointer text-sm text-gray-500'>Error details (development only)</summary>
						<pre className='mt-2 overflow-auto rounded bg-gray-100 p-4 text-xs dark:bg-gray-800'>{error.stack}</pre>
					</details>
				)}
			</div>
		</div>
	);
};

export default Error;
