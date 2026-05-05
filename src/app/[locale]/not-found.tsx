import { Button } from '@/components/layout/common/button';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';

const NotFound = async () => {
	const locale = await getLocale();
	setRequestLocale(locale);
	const translateNotFound = await getTranslations('common.notFound');
	const translateButtons = await getTranslations('common.buttons');

	return (
		<div className='relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4'>
			<div className='glow-blob-primary pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full' />
			<div className='relative z-10 text-center'>
				<p className='text-primary dark:text-success text-heading-xsmall tracking-[0.3em] uppercase'>{translateNotFound('label')}</p>
				<h1 className='font-cg text-dark mt-2 text-[7rem] leading-none font-medium sm:text-[11rem] dark:text-white'>404</h1>
				<h2 className='text-secondary-600 dark:text-secondary-400 text-heading-medium mt-4'>{translateNotFound('title')}</h2>
				<p className='text-paragraph-medium text-secondary-600 dark:text-secondary-400 mx-auto mt-3 max-w-xs'>{translateNotFound('description')}</p>
				<div className='mt-8 flex justify-center'>
					<Button fill to='/'>
						{translateButtons('goHome')}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
