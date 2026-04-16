'use client';

import { cn } from '@/lib/utils';
import type { StackingCardConfig } from '@/types/stacking-cards';
import { type MotionValue, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { type ReactNode, type RefObject, useMemo } from 'react';

type StackingCardWrapperProps = {
	children: ReactNode;
	config: StackingCardConfig;
	scrollYProgress: MotionValue<number>;
	enabled: boolean;
	cardRef: RefObject<HTMLDivElement | null>;
	triggerRef: RefObject<HTMLDivElement | null>;
	className?: string;
};

const SHELL_CLASS = 'sticky flex min-h-110 w-full items-start justify-center';
const INNER_CLASS = 'relative w-full';
const INNER_STYLE_BASE = { transformOrigin: 'top' as const, willChange: 'transform' as const };

const buildOffset = (stickyTop: number, indexOffset: number) => [`start ${stickyTop + indexOffset}px`, `start ${stickyTop}px`] as [`start ${number}px`, `start ${number}px`];

const DefaultCard = ({ children, config, scrollYProgress, cardRef, triggerRef, className }: StackingCardWrapperProps) => {
	const { stickyTop, indexOffset, zIndex, targetScale, reverseTargetScale, range, topIncrement } = config;

	const offset = useMemo(() => buildOffset(stickyTop, indexOffset), [stickyTop, indexOffset]);
	const style = useMemo(() => ({ zIndex, marginBottom: topIncrement, top: stickyTop + indexOffset }), [zIndex, topIncrement, stickyTop, indexOffset]);

	const [rangeStart, rangeEnd] = range;
	const rangeSpan = Math.max(rangeEnd - rangeStart, 1e-6);
	const { scrollYProgress: triggerProgress } = useScroll({ target: triggerRef, offset });
	const scale = useTransform<number, number>([scrollYProgress, triggerProgress], ([sp, tp]) => {
		const t = sp <= rangeStart ? 0 : sp >= rangeEnd ? 1 : (sp - rangeStart) / rangeSpan;
		const s = 1 + (targetScale - 1) * t;
		return s + (reverseTargetScale - s) * tp;
	});

	return (
		<div ref={cardRef} style={style} className={cn(SHELL_CLASS, className)}>
			<motion.div style={{ ...INNER_STYLE_BASE, scale }} className={INNER_CLASS}>
				{children}
			</motion.div>
		</div>
	);
};

const LastCard = ({ children, config, cardRef, triggerRef, className }: StackingCardWrapperProps) => {
	const { stickyTop, indexOffset, zIndex, reverseTargetScale, topIncrement } = config;

	const offset = useMemo(() => buildOffset(stickyTop, indexOffset), [stickyTop, indexOffset]);
	const style = useMemo(() => ({ zIndex, marginBottom: topIncrement }), [zIndex, topIncrement]);

	const { scrollYProgress: triggerProgress } = useScroll({ target: triggerRef, offset });
	const scale = useTransform(triggerProgress, [0, 1], [1, reverseTargetScale]);

	return (
		<div ref={cardRef} style={style} className={cn(SHELL_CLASS, className)}>
			<motion.div style={{ ...INNER_STYLE_BASE, scale }} className={INNER_CLASS}>
				{children}
			</motion.div>
		</div>
	);
};

const StaticCard = ({ children, config, cardRef, className }: StackingCardWrapperProps) => {
	const { stickyTop, indexOffset, zIndex, topIncrement, isLast } = config;
	const style = useMemo(() => (isLast ? { zIndex, marginBottom: topIncrement } : { zIndex, marginBottom: topIncrement, top: stickyTop + indexOffset }), [zIndex, topIncrement, stickyTop, indexOffset, isLast]);
	return (
		<div ref={cardRef} style={style} className={cn(SHELL_CLASS, className)}>
			<div className={INNER_CLASS}>{children}</div>
		</div>
	);
};

const StackingCardWrapper = (props: StackingCardWrapperProps) => {
	const { config, enabled, children, className } = props;
	const reducedMotion = useReducedMotion();

	if (!enabled) {
		return <div className={cn('w-full', className)}>{children}</div>;
	}

	if (reducedMotion === true) return <StaticCard {...props} />;
	if (config.isLast) return <LastCard {...props} />;
	return <DefaultCard {...props} />;
};

StackingCardWrapper.displayName = 'StackingCardWrapper';

export default StackingCardWrapper;
