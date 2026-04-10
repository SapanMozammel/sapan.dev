import Link from 'next/link';

const NotFound = () => {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center px-4'>
			<div className='text-center'>
				<h1 className='font-cg text-dark text-3xl font-bold sm:text-6xl dark:text-white'>404</h1>
				<h2 className='font-cg text-secondary-600 dark:text-secondary-400 mt-4 text-lg font-bold sm:text-2xl'>Page Not Found</h2>
				<p className='font-dm text-secondary-500 dark:text-secondary-500 mt-2'>Sorry, the page you are looking for doesn't exist.</p>
				<Link href='/' className='font-hg bg-primary dark:bg-success dark:text-dark mt-6 inline-block rounded-md px-6 py-3 text-white transition-colors hover:opacity-90'>
					Go back home
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
