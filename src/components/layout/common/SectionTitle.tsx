import { cn } from '@/lib/utils';
import { SectionTitleTypes } from '@/types/title';

const SectionTitle = ({ title, subtitle, watermark, className }: SectionTitleTypes) => (
	<div className={cn('relative z-1 w-full py-6 text-center sm:py-10', className)}>
		{watermark && (
			<span
				aria-hidden='true'
				className='font-cg text-secondary-100/50 dark:text-secondary-800/50 pointer-events-none absolute top-1/2 left-1/2 -z-1 -translate-x-1/2 -translate-y-1/2 text-[12vw] leading-none font-bold select-none sm:text-[10vw]'
			>
				{watermark}
			</span>
		)}
		{subtitle && <p className={cn('font-hg text-secondary-500 dark:text-secondary-500 text-xs leading-none font-bold tracking-widest uppercase sm:text-sm', watermark ? 'pt-[10vw]' : 'pt-[2vw]')}>{subtitle}</p>}
		<h2 className={cn('font-cg text-dark text-2xl leading-none font-medium tracking-wide sm:mb-2 sm:text-3xl lg:text-5xl dark:text-white', subtitle ? 'mt-1 sm:mt-3' : 'mt-5 mb-4 sm:mt-7')}>{title}</h2>
	</div>
);

export default SectionTitle;
