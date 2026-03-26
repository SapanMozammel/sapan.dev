import { cn } from '@/lib/utils';
import { SectionTitleTypes } from '@/types/title';

const SectionTitle = ({ title, subtitle, watermark, className }: SectionTitleTypes) => (
	<div className={cn('relative z-1 w-full py-6 text-center sm:py-10', className)}>
		{watermark && (
			<span
				aria-hidden='true'
				className='font-eb text-secondary-100/75 dark:text-secondary-800/50 pointer-events-none absolute top-1/2 left-1/2 -z-1 -translate-x-1/2 -translate-y-1/2 text-[12vw] leading-none font-bold select-none sm:text-[10vw]'
			>
				{watermark}
			</span>
		)}
		{subtitle && <p className={`font-sora text-secondary-400 dark:text-secondary-500 ${watermark ? 'pt-[10vw]' : 'pt-[2vw]'} text-sm leading-none font-semibold tracking-widest uppercase`}>{subtitle}</p>}
		<h2 className={`font-cg ${subtitle ? 'mt-1 sm:mt-3' : 'mt-5 mb-4 sm:mt-7'} mb-2 text-3xl leading-none font-medium tracking-wide text-black sm:text-5xl dark:text-white`}>{title}</h2>
	</div>
);

export default SectionTitle;
