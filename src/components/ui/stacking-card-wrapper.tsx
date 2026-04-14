'use client';

import { cn } from '@/lib/utils';
import type { StackingCardConfig } from '@/types/stacking-cards';
import { type MotionValue, motion, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';

type StackingCardWrapperProps = {
	children: ReactNode;
	config: StackingCardConfig;
	scrollYProgress: MotionValue<number>;
	enabled: boolean;
	className?: string;
};

const StackingCardWrapper = ({ children, config, scrollYProgress, enabled, className }: StackingCardWrapperProps) => {
	const { stickyTop, indexOffset, zIndex, targetScale, range } = config;

	const scale = useTransform(scrollYProgress, range, [1, targetScale]);

	if (!enabled) {
		return <div className={cn('w-full', className)}>{children}</div>;
	}

	return (
		<div style={{ top: stickyTop, zIndex, height: `calc(100vh - ${stickyTop}px)` }} className={cn('sticky flex w-full items-start justify-center', className)}>
			<motion.div
				style={{
					scale,
					top: indexOffset,
					transformOrigin: 'top',
				}}
				className='relative w-full'
			>
				{children}
			</motion.div>
		</div>
	);
};

StackingCardWrapper.displayName = 'StackingCardWrapper';

export default StackingCardWrapper;
