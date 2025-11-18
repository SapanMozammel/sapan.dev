import { cn } from '@/lib/utils';
import React, { memo } from 'react';

const TestimonialBackground = memo<React.DetailedHTMLProps<React.AllHTMLAttributes<HTMLDivElement>, HTMLDivElement>>((props) => {
	const { children, className, ...rest } = props;
	return (
		<React.Fragment>
			{children}
			<div className={cn('pointer-events-none absolute top-3/5 left-1/2 -z-2', className)} {...rest}>
				<div className='bg-primary absolute -top-20 -left-120 aspect-square h-70 rounded-full blur-[10em]' />
				<div className='bg-info absolute top-10 -left-8 aspect-square h-28 rounded-full blur-[6em]' />
				<div className='bg-danger dark:bg-success absolute top-0 -right-100 aspect-square h-40 rounded-full blur-[9em]' />
			</div>
		</React.Fragment>
	);
});

TestimonialBackground.displayName = 'TestimonialBackground';

export default TestimonialBackground;
