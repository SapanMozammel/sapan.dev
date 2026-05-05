'use client';

import { cn } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import { motion, motionValue, type MotionValue, useAnimationFrame } from 'framer-motion';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';

const BASELINE_OPACITY = 0.05;
const EDGE_OPACITY = 1;
const HOVER_OPACITY_BOOST = 0.2;
const MOUSE_RADIUS = 300;
const SMOOTHING = 24;
const OPACITY_EPSILON = 0.0005;

const TestimonialBackground = memo<React.DetailedHTMLProps<React.AllHTMLAttributes<HTMLDivElement>, HTMLDivElement>>((props) => {
	const { children, className, ...rest } = props;
	const containerRef = useRef<HTMLDivElement>(null);
	const [lineCount, setLineCount] = useState(0);
	const [pathD, setPathD] = useState('');
	const targetsRef = useRef<number[]>([]);
	const rafMovRef = useRef<number | null>(null);

	const opacityValues = useMemo(() => {
		if (lineCount === 0) {
			targetsRef.current = [];
			return [] as MotionValue<number>[];
		}
		const lastIdx = lineCount - 1;
		const values: MotionValue<number>[] = [];
		const targets: number[] = [];
		for (let i = 0; i < lineCount; i++) {
			const isEdge = i === 0 || i === lastIdx;
			const initial = isEdge ? EDGE_OPACITY : BASELINE_OPACITY;
			values.push(motionValue(initial));
			targets.push(initial);
		}
		targetsRef.current = targets;
		return values;
	}, [lineCount]);

	useEffect(() => {
		const updateLayout = () => {
			const container = containerRef.current;
			if (!container) return;
			const width = container.clientWidth;
			const height = container.clientHeight;
			const targetCount = Math.ceil(width / 4) + 1;
			setLineCount((prev) => (prev !== targetCount ? targetCount : prev));
			setPathD(`M 0.5 0 L 0.5 ${height}`);
		};

		const resizeObserver = new ResizeObserver(() => {
			requestAnimationFrame(updateLayout);
		});
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}
		updateLayout();

		const handleMouseMove = (e: MouseEvent) => {
			if (rafMovRef.current !== null) return;
			const clientX = e.clientX;
			rafMovRef.current = requestAnimationFrame(() => {
				rafMovRef.current = null;
				const container = containerRef.current;
				if (!container) return;
				const rect = container.getBoundingClientRect();
				const containerLeft = rect.left;
				const containerWidth = rect.width;
				const targets = targetsRef.current;
				const len = targets.length;
				for (let i = 1; i < len - 1; i++) {
					const centerX = containerLeft + (i / (len - 1)) * containerWidth;
					const distanceX = Math.abs(clientX - centerX);
					if (distanceX < MOUSE_RADIUS) {
						const proximity = 1 - distanceX / MOUSE_RADIUS;
						targets[i] = BASELINE_OPACITY + HOVER_OPACITY_BOOST * proximity * proximity;
					} else {
						targets[i] = BASELINE_OPACITY;
					}
				}
			});
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			resizeObserver.disconnect();
			if (rafMovRef.current !== null) {
				cancelAnimationFrame(rafMovRef.current);
			}
		};
	}, []);

	useAnimationFrame((_, delta) => {
		const values = opacityValues;
		const targets = targetsRef.current;
		const len = values.length;
		if (len <= 2) return;
		const alpha = 1 - Math.exp(-SMOOTHING * Math.min(delta / 1000, 0.1));
		for (let i = 1; i < len - 1; i++) {
			const mv = values[i];
			if (!mv) continue;
			const target = targets[i] ?? BASELINE_OPACITY;
			const current = mv.get();
			const diff = target - current;
			if (Math.abs(diff) > OPACITY_EPSILON) {
				mv.set(current + diff * alpha);
			} else if (current !== target) {
				mv.set(target);
			}
		}
	});

	const STAR_CLASSES = 'w-3 md:w-4 h-3 md:h-4 text-primary dark:text-success z-1';

	return (
		<React.Fragment>
			<div ref={containerRef} className={cn('section-separator pointer-events-none select-none', className)}>
				<IconPlus stroke={6} className={cn(STAR_CLASSES, 'absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2')} />
				<IconPlus stroke={6} className={cn(STAR_CLASSES, 'absolute top-0 right-0 translate-x-1/2 -translate-y-1/2')} />
				<IconPlus stroke={6} className={cn(STAR_CLASSES, 'absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2')} />
				<IconPlus stroke={6} className={cn(STAR_CLASSES, 'absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2')} />
				<div className='flex h-full w-full justify-between'>
					{opacityValues.map((mv, i) => (
						<div key={i} className={cn('group/line relative h-full w-px first:-translate-x-1/2 last:translate-x-1/2', 'text-secondary-400 dark:text-secondary-600')}>
							<svg className='pointer-events-none absolute top-0 left-0 h-full w-px overflow-visible'>
								<motion.path d={pathD} stroke='currentColor' strokeWidth='1' fill='none' style={{ opacity: mv }} />
							</svg>
						</div>
					))}
				</div>
			</div>
			<div className={cn('pointer-events-none absolute top-3/5 left-1/2 -z-2', className)} {...rest}>
				<div className='bg-primary absolute -top-20 -left-120 aspect-square h-70 rounded-full blur-[10em]' />
				<div className='bg-info absolute top-10 -left-8 aspect-square h-28 rounded-full blur-[6em]' />
				<div className='bg-danger dark:bg-success absolute top-0 -right-100 aspect-square h-40 rounded-full blur-[9em]' />
			</div>
			{children}
		</React.Fragment>
	);
});

TestimonialBackground.displayName = 'TestimonialBackground';

export default TestimonialBackground;
