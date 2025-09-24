import Pattern from '@/components/icons/Pattern';
import WorldMap from '@/components/icons/WorldMap';
import React, { memo, useMemo } from 'react';

const HeroBackground = memo<React.DetailedHTMLProps<React.AllHTMLAttributes<HTMLDivElement>, HTMLDivElement>>((props) => {
	const { children, className, ...rest } = props;

	// Memoize computed className to prevent recalculation
	const computedClassName = useMemo(() => `pointer-events-none absolute inset-0 -z-2 overflow-hidden select-none ${className ?? ''}`, [className]);
	return (
		<React.Fragment>
			{children}
			<div className={computedClassName} {...rest}>
				<div className='absolute inset-0 flex items-center justify-center'>
					<WorldMap className='fill-secondary-100 h-full w-auto dark:fill-gray-500/25' />
				</div>
				<div className='absolute inset-0 flex items-center justify-center'>
					<Pattern className='text-secondary-700 dark:text-secondary-400 h-full w-auto' />
				</div>
				<div className='from-info/50 via-info/15 absolute top-1/2 left-1/2 aspect-square w-256 max-w-full -translate-x-1/2 -translate-y-1/2 bg-radial via-40% to-transparent to-60%' />
			</div>
		</React.Fragment>
	);
});

HeroBackground.displayName = 'HeroBackground';

export default HeroBackground;
