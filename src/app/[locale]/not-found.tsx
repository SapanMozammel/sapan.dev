import Link from 'next/link';

const NotFound = () => {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center px-4'>
			<div className='text-center'>
				<h1 className='text-6xl font-bold text-gray-900 dark:text-white'>404</h1>
				<h2 className='mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300'>Page Not Found</h2>
				<p className='mt-2 text-gray-600 dark:text-gray-400'>Sorry, the page you are looking for doesn&apos;t exist.</p>
				<Link href='/' className='mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'>
					Go back home
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
