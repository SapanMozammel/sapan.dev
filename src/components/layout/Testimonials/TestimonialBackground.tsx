'use client';

import { cn } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import gsap from 'gsap';
import React, { memo, useEffect, useRef } from 'react';

const TestimonialBackground = memo<React.DetailedHTMLProps<React.AllHTMLAttributes<HTMLDivElement>, HTMLDivElement>>((props) => {
	const { children, className, ...rest } = props;
	const linesRef = useRef<(SVGPathElement | null)[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const [lineCount, setLineCount] = React.useState(0);
	const rafMovRef = useRef<number | null>(null);
	// Pre-compiled quickTo setters — rebuilt when lineCount changes, used in mousemove RAF
	const quickToOpacity = useRef<Array<ReturnType<typeof gsap.quickTo> | null>>([]);

	useEffect(() => {
		const updateLayout = () => {
			const container = containerRef.current;
			if (!container) {
				return;
			}

			const width = container.clientWidth;
			const height = container.clientHeight;

			const targetCount = Math.ceil(width / 4) + 1;
			setLineCount((prev) => (prev !== targetCount ? targetCount : prev));

			linesRef.current.forEach((line) => {
				if (!line) {
					return;
				}
				line.setAttribute('d', `M 0.5 0 L 0.5 ${height}`);
			});
		};

		const resizeObserver = new ResizeObserver(() => {
			requestAnimationFrame(updateLayout);
		});

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		updateLayout();

		const handleMouseMove = (e: MouseEvent) => {
			// Skip if a frame is already pending — avoids stacking RAF callbacks
			if (rafMovRef.current !== null) {
				return;
			}
			const clientX = e.clientX;
			rafMovRef.current = requestAnimationFrame(() => {
				rafMovRef.current = null;
				const container = containerRef.current;
				if (!container) {
					return;
				}
				// One getBoundingClientRect on the container instead of one per line
				const containerRect = container.getBoundingClientRect();
				const containerLeft = containerRect.left;
				const containerWidth = containerRect.width;
				const setters = quickToOpacity.current;
				const len = setters.length;
				const mouseRadius = 300;

				// Lines are evenly distributed via flex justify-between, so
				// center X of line[i] = containerLeft + (i / (len - 1)) * containerWidth
				for (let i = 1; i < len - 1; i++) {
					const setter = setters[i];
					if (!setter) {
						continue;
					}
					const centerX = containerLeft + (i / (len - 1)) * containerWidth;
					const distanceX = Math.abs(clientX - centerX);

					if (distanceX < mouseRadius) {
						const proximity = 1 - distanceX / mouseRadius;
						setter(0.05 + 0.2 * proximity * proximity);
					} else {
						setter(0.05);
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

	useEffect(() => {
		const container = containerRef.current;
		if (!container) {
			return;
		}
		const height = container.clientHeight;

		linesRef.current.forEach((line) => {
			if (!line) {
				return;
			}
			line.setAttribute('d', `M 0.5 0 L 0.5 ${height}`);
		});

		// Rebuild pre-compiled quickTo setters for the new line set
		quickToOpacity.current = linesRef.current.map((line) => (line ? gsap.quickTo(line, 'opacity', { duration: 0.1, ease: 'power2.out' }) : null));
	}, [lineCount]);

	const STAR_CLASSES = 'w-3 md:w-4 h-3 md:h-4 text-primary dark:text-success z-1';

	return (
		<React.Fragment>
			<div ref={containerRef} className={cn('section-separator pointer-events-none select-none', className)}>
				<IconPlus stroke={6} className={cn(STAR_CLASSES, 'absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2')} />
				<IconPlus stroke={6} className={cn(STAR_CLASSES, 'absolute top-0 right-0 translate-x-1/2 -translate-y-1/2')} />
				<IconPlus stroke={6} className={cn(STAR_CLASSES, 'absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2')} />
				<IconPlus stroke={6} className={cn(STAR_CLASSES, 'absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2')} />
				<div className='flex h-full w-full justify-between'>
					{Array.from({ length: lineCount }).map((_, i) => (
						<div key={i} className={cn('group/line relative h-full w-px first:-translate-x-1/2 last:translate-x-1/2', 'text-secondary-400 dark:text-secondary-600')}>
							<svg className='pointer-events-none absolute top-0 left-0 h-full w-px overflow-visible'>
								<path
									ref={(el) => {
										linesRef.current[i] = el;
									}}
									d=''
									stroke='currentColor'
									strokeWidth='1'
									fill='none'
									className={cn('transition-opacity', 'opacity-5 group-first/line:opacity-100 group-last/line:opacity-100')}
								/>
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
