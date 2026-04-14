'use client';

import { cn } from '@/lib/utils';
import type { StackingCardConfig } from '@/types/stacking-cards';
import { type MotionValue, motion, useScroll, useTransform } from 'framer-motion';
import type { ReactNode, RefObject } from 'react';

type StackingCardWrapperProps = {
	children: ReactNode;
	config: StackingCardConfig;
	scrollYProgress: MotionValue<number>;
	enabled: boolean;
	cardRef: RefObject<HTMLDivElement | null>;
	triggerRef: RefObject<HTMLDivElement | null>;
	className?: string;
};

const StackingCardWrapper = ({ children, config, scrollYProgress, enabled, cardRef, triggerRef, className }: StackingCardWrapperProps) => {
	const { stickyTop, indexOffset, zIndex, targetScale, reverseTargetScale, range, topIncrement, isLast } = config;

	const stackedScale = useTransform(scrollYProgress, range, [1, targetScale]);

	const { scrollYProgress: selfProgress } = useScroll({
		target: triggerRef,
		offset: [`start ${stickyTop + indexOffset}px`, `start ${stickyTop}px`],
	});
	const lastScale = useTransform(selfProgress, [0, 1], [1, reverseTargetScale]);
	const composedScale = useTransform<number, number>([stackedScale, selfProgress], ([sc, p]) => sc + (reverseTargetScale - sc) * p);

	const scale = isLast ? lastScale : composedScale;

	if (!enabled) {
		return <div className={cn('w-full', className)}>{children}</div>;
	}

	const style = isLast ? { zIndex, marginBottom: topIncrement } : { zIndex, marginBottom: topIncrement, top: stickyTop + indexOffset };

	return (
		<div ref={cardRef} style={style} className={cn('sticky flex min-h-110 w-full items-start justify-center', className)}>
			<motion.div
				style={{
					scale,
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
