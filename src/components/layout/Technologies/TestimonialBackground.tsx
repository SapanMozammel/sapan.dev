import { cn } from '@/lib/utils';
import React, { memo } from 'react';

const TestimonialBackground = memo<React.DetailedHTMLProps<React.AllHTMLAttributes<HTMLDivElement>, HTMLDivElement>>((props) => {
	const { children, className, ...rest } = props;
	return (
		<React.Fragment>
			{children}
			<div className={cn('pointer-events-none absolute top-3/5 left-1/2 -z-2', className)} {...rest}>
				<div className='bg-primary absolute -top-20 -left-120 aspect-square h-70 rounded-full blur-[10em]' />
				<div className='bg-info absolute top-10 left-0 aspect-video h-20 rounded-full blur-[6em]' />
				<div className='bg-warning absolute top-0 -right-100 aspect-square h-30 rounded-full blur-[11em]' />
			</div>
		</React.Fragment>
	);
});

export default TestimonialBackground;
