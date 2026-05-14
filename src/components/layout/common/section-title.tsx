import { cn } from '@/lib/utils';

type SectionTitleTypes = {
	className?: string;
	title: string;
	subtitle?: string;
	watermark?: string;
};

const SectionTitle = ({ title, subtitle, watermark, className }: SectionTitleTypes) => (
	<div className={cn('relative z-1 w-full py-6 text-center sm:py-10', className)}>
		{watermark && (
			<span
				aria-hidden='true'
				className='font-cg text-secondary-100/50 dark:text-secondary-800/50 pointer-events-none absolute top-1/2 left-1/2 -z-1 -translate-1/2 text-[12vw] leading-none font-medium select-none sm:text-[10vw]'
			>
				{watermark}
			</span>
		)}
		{subtitle && <h5 className={cn('text-heading-xsmall text-secondary-500 dark:text-secondary-500 tracking-widest uppercase', watermark ? 'pt-[10vw]' : 'pt-[2vw]')}>{subtitle}</h5>}
		<h2 className={cn('text-heading-large text-dark tracking-wide sm:mb-2 dark:text-white', subtitle ? 'mt-1 sm:mt-3' : 'mt-5 mb-4 sm:mt-7')}>{title}</h2>
	</div>
);

export default SectionTitle;
