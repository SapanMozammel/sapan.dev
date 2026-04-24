import { IconLoader } from '@tabler/icons-react';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';

const Loading = async () => {
	// loading.tsx has no params prop, so fall back to getLocale() — it reads
	// the locale from async context after the parent layout has set it.
	const locale = await getLocale();
	setRequestLocale(locale);
	const translateCommon = await getTranslations('common');

	return (
		<div className='relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4'>
			<div className='glow-blob-primary-sm pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full' />
			<div className='relative z-10 text-center'>
				<IconLoader className='text-primary dark:text-success mx-auto h-8 w-8 animate-spin' />
				<p className='text-heading-small text-secondary-600 dark:text-secondary-400 mt-4 tracking-wider'>{translateCommon('loading')}</p>
			</div>
		</div>
	);
};

export default Loading;
