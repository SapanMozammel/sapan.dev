import { Button } from '@/components/layout/common/Button';

const NotFound = () => (
	<div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4'>
		<div className='glow-blob-primary pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full' />
		<div className='relative z-10 text-center'>
			<p className='text-primary dark:text-success text-heading-xsmall tracking-[0.3em] uppercase'>Error</p>
			<h1 className='font-cg text-dark mt-2 text-[7rem] leading-none font-medium sm:text-[11rem] dark:text-white'>404</h1>
			<h2 className='text-secondary-600 dark:text-secondary-400 text-heading-medium mt-4'>Page Not Found</h2>
			<p className='text-paragraph-medium text-secondary-600 dark:text-secondary-400 mx-auto mt-3 max-w-xs'>Sorry, the page you were looking for could not be found. It may have been moved or deleted.</p>
			<div className='mt-8 flex justify-center'>
				<Button fill to='/'>
					Go back home
				</Button>
			</div>
		</div>
	</div>
);

export default NotFound;
