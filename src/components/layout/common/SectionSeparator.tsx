import { SeparatorTypes } from '@/types/separator';
import { IconPlus } from '@tabler/icons-react';

const STAR_CLASSES = 'w-3 md:w-4 h-3 md:h-4 text-primary dark:text-success z-1';
const LINE_CLASSES = 'border-solid border-secondary-400 dark:border-secondary-600';

const SectionSeparator = ({
	lts = false,
	rts = false,
	lbs = false,
	rbs = false,
	tl = false,
	bl = false,
	ll = false,
	rl = false,
	className,
	children,
	...rest
}: React.DetailedHTMLProps<React.AllHTMLAttributes<HTMLDivElement>, HTMLDivElement> & SeparatorTypes) => {
	const containerClass = `section-separator pointer-events-none select-none ${className ?? ''}`;

	return (
		<>
			<div className={containerClass} {...rest}>
				{lts ? <IconPlus stroke={6} className={`${STAR_CLASSES} absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2`} /> : null}
				{rts ? <IconPlus stroke={6} className={`${STAR_CLASSES} absolute top-0 right-0 translate-x-1/2 -translate-y-1/2`} /> : null}
				{lbs ? <IconPlus stroke={6} className={`${STAR_CLASSES} absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2`} /> : null}
				{rbs ? <IconPlus stroke={6} className={`${STAR_CLASSES} absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2`} /> : null}
				{tl ? <span className={`${LINE_CLASSES} absolute inset-x-0 top-0 -translate-y-1/2 border-t`} /> : null}
				{bl ? <span className={`${LINE_CLASSES} absolute inset-x-0 bottom-0 translate-y-1/2 border-b`} /> : null}
				{ll ? <span className={`${LINE_CLASSES} absolute inset-y-0 left-0 -translate-x-1/2 border-l`} /> : null}
				{rl ? <span className={`${LINE_CLASSES} absolute inset-y-0 right-0 translate-x-1/2 border-r`} /> : null}
			</div>
			{children}
		</>
	);
};

export default SectionSeparator;
