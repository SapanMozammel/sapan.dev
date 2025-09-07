import { SeparatorTypes } from '@/types/separator';
import { IconPlus } from '@tabler/icons-react';
import React, { memo, useMemo } from 'react';

// Move static classes outside component to prevent recreation
const STAR_CLASSES = 'w-3 md:w-4 text-primary dark:text-success z-1';
const LINE_CLASSES = 'border-solid border-secondary-400 dark:border-secondary-600';

const SectionSeparator = memo<React.DetailedHTMLProps<React.AllHTMLAttributes<HTMLDivElement>, HTMLDivElement> & SeparatorTypes>((props) => {
	const { lts = false, rts = false, lbs = false, rbs = false, tl = false, bl = false, ll = false, rl = false, className, children, ...rest } = props;

	// Memoize computed classes to prevent recalculation
	const computedClasses = useMemo(
		() => ({
			star: STAR_CLASSES,
			line: LINE_CLASSES,
			container: `section-separator pointer-events-none select-none ${className ?? ''}`,
		}),
		[className]
	);

	return (
		<React.Fragment>
			<div className={computedClasses.container} {...rest}>
				{lts ? <IconPlus stroke={6} className={`${computedClasses.star} absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2`} /> : null}
				{rts ? <IconPlus stroke={6} className={`${computedClasses.star} absolute top-0 right-0 translate-x-1/2 -translate-y-1/2`} /> : null}
				{lbs ? <IconPlus stroke={6} className={`${computedClasses.star} absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2`} /> : null}
				{rbs ? <IconPlus stroke={6} className={`${computedClasses.star} absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2`} /> : null}
				{tl ? <span className={`${computedClasses.line} absolute inset-x-0 top-0 -translate-y-1/2 border-t`} /> : null}
				{bl ? <span className={`${computedClasses.line} absolute inset-x-0 bottom-0 translate-y-1/2 border-b`} /> : null}
				{ll ? <span className={`${computedClasses.line} absolute inset-y-0 left-0 -translate-x-1/2 border-l`} /> : null}
				{rl ? <span className={`${computedClasses.line} absolute inset-y-0 right-0 translate-x-1/2 border-r`} /> : null}
			</div>
			{children}
		</React.Fragment>
	);
});

SectionSeparator.displayName = 'SectionSeparator';

export default SectionSeparator;
