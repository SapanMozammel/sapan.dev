'use client';

import { cn } from '@/lib/utils';
import type { MarqueeProps } from '@/types/marquee';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

const MarqueeComponent: React.FC<MarqueeProps> = ({ children, speed = 60, direction = 'left', pauseOnHover = false, className }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const [contentWidth, setContentWidth] = useState(0);
	const pausedRef = useRef(false);
	const x = useMotionValue(0);

	const measure = useCallback(() => {
		if (!contentRef.current) return;
		const width = contentRef.current.scrollWidth;
		setContentWidth(width);
		x.set(direction === 'left' ? 0 : -width);
	}, [direction, x]);

	useEffect(() => {
		const timeoutId = setTimeout(measure, 100);
		window.addEventListener('resize', measure);
		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener('resize', measure);
		};
	}, [measure]);

	useAnimationFrame((_, delta) => {
		if (pausedRef.current || contentWidth === 0) return;
		const moveBy = (speed * delta) / 1000;
		let next = x.get();
		if (direction === 'left') {
			next -= moveBy;
			if (next <= -contentWidth) next += contentWidth;
		} else {
			next += moveBy;
			if (next >= 0) next -= contentWidth;
		}
		x.set(next);
	});

	const handleMouseEnter = useCallback(() => {
		if (pauseOnHover) pausedRef.current = true;
	}, [pauseOnHover]);

	const handleMouseLeave = useCallback(() => {
		if (pauseOnHover) pausedRef.current = false;
	}, [pauseOnHover]);

	return (
		<div ref={containerRef} className={cn('relative flex w-full flex-row overflow-hidden rtl:flex-row-reverse', className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<motion.div className='flex w-fit flex-row rtl:flex-row-reverse' style={{ x }}>
				<div ref={contentRef} className='flex shrink-0 flex-row rtl:flex-row-reverse'>
					{children}
				</div>
				<div className='flex shrink-0 flex-row rtl:flex-row-reverse' aria-hidden='true'>
					{children}
				</div>
			</motion.div>
		</div>
	);
};

const Marquee = memo(MarqueeComponent);
Marquee.displayName = 'Marquee';

export default Marquee;
