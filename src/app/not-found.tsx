import { fontList } from '@/app/fonts';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Root not-found renders for paths that fall through the [locale] matcher
// (e.g. `/_not-found`). The root layout is a pass-through, so this page must
// carry its own html/body/font classes.
const NotFound = () => (
	<html lang='en' suppressHydrationWarning>
		<body className={cn(fontList, 'font-dm')} suppressHydrationWarning>
			<div className='relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-white px-4 dark:bg-black'>
				<div className='glow-blob-primary pointer-events-none absolute top-1/2 left-1/2 -translate-1/2 rounded-full' />
				<div className='relative z-10 text-center'>
					<p className='text-primary dark:text-success text-heading-xsmall tracking-[0.3em] uppercase'>Error</p>
					<h1 className='font-cg text-dark mt-2 text-[7rem] leading-none font-medium sm:text-[11rem] dark:text-white'>404</h1>
					<h2 className='text-secondary-600 dark:text-secondary-400 text-heading-medium mt-4'>Page Not Found</h2>
					<p className='text-paragraph-medium text-secondary-600 dark:text-secondary-400 mx-auto mt-3 max-w-xs'>Sorry, the page you were looking for could not be found. It may have been moved or deleted.</p>
					<div className='mt-8 flex justify-center'>
						<Link href='/' className='font-hg bg-primary dark:bg-success dark:text-dark inline-flex items-center rounded-full px-6 py-2.5 text-sm text-white transition-opacity hover:opacity-80'>
							Go back home
						</Link>
					</div>
				</div>
			</div>
		</body>
	</html>
);

export default NotFound;
