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
			linesRef.current.forEach((line, index) => {
				if (!line) {
					return;
				}
				if (index === 0 || index === linesRef.current.length - 1) {
					return;
				}

				const rect = line.getBoundingClientRect();
				const centerX = rect.left + rect.width / 2;
				const distanceX = Math.abs(e.clientX - centerX);
				const mouseRadius = 300;

				if (distanceX < mouseRadius) {
					const proximity = 1 - distanceX / mouseRadius;
					const smoothProximity = proximity * proximity;

					gsap.to(line, {
						opacity: 0.05 + 0.2 * smoothProximity,
						duration: 0.1,
						ease: 'power2.out',
						overwrite: 'auto',
					});
				} else {
					gsap.to(line, {
						opacity: 0.05,
						duration: 0.1,
						ease: 'power2.out',
						overwrite: 'auto',
					});
				}
			});
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			resizeObserver.disconnect();
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
	}, [lineCount]);

	const STAR_CLASSES = 'w-3 md:w-4 h-3 md:h-4 text-primary dark:text-success z-1';

	return (
		<React.Fragment>
			<div ref={containerRef} className={`section-separator pointer-events-none select-none ${className ?? ''}`}>
				<IconPlus stroke={6} className={`${STAR_CLASSES} absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2`} />
				<IconPlus stroke={6} className={`${STAR_CLASSES} absolute top-0 right-0 translate-x-1/2 -translate-y-1/2`} />
				<IconPlus stroke={6} className={`${STAR_CLASSES} absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2`} />
				<IconPlus stroke={6} className={`${STAR_CLASSES} absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2`} />
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
