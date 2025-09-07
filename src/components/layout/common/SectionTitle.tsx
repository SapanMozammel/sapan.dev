import { SectionTitleTypes } from '@/types/title';
import { memo } from 'react';

const SectionTitle = memo<SectionTitleTypes>(({ title, subtitle, watermark }) => {
	return (
		<div className='relative z-1 w-full py-10'>
			{watermark && (
				<span
					aria-hidden='true'
					className='font-eb text-secondary-100/50 dark:text-secondary-800/50 pointer-events-none absolute top-1/2 left-1/2 -z-1 -translate-x-1/2 -translate-y-1/2 text-[10vw] leading-none font-bold select-none'
				>
					{watermark}
				</span>
			)}
			{subtitle && <p className={`font-fira text-secondary-400 dark:text-secondary-500 ${watermark ? 'pt-36' : 'pt-10'} text-sm leading-none font-semibold tracking-widest uppercase`}>{subtitle}</p>}
			<h2 className={`font-cg ${subtitle ? 'mt-3' : 'mt-7 mb-4'} text-5xl leading-none font-medium tracking-wide text-black dark:text-white`}>{title}</h2>
		</div>
	);
});

SectionTitle.displayName = 'SectionTitle';

export default SectionTitle;
