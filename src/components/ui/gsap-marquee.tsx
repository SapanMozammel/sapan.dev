'use client';

import { cn } from '@/lib/utils';
import type { MarqueeProps } from '@/types/marquee';
import { gsap } from 'gsap';
import React, { memo, useCallback, useEffect, useRef } from 'react';

const GsapMarqueeComponent: React.FC<MarqueeProps> = ({ children, speed = 60, direction = 'left', pauseOnHover = false, className }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const cloneRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);

	const initializeAnimation = useCallback(() => {
		if (!containerRef.current || !contentRef.current || !cloneRef.current) {
			return;
		}

		if (timelineRef.current) {
			timelineRef.current.kill();
			timelineRef.current = null;
		}

		const contentWidth = contentRef.current.scrollWidth;
		const duration = contentWidth / speed;

		const timeline = gsap.timeline({
			repeat: -1,
		});

		if (direction === 'left') {
			gsap.set([contentRef.current, cloneRef.current], { x: 0 });

			timeline.to([contentRef.current, cloneRef.current], {
				x: -contentWidth,
				duration,
				ease: 'none',
				modifiers: {
					x: (x) => {
						const xValue = parseFloat(x);
						return `${xValue % contentWidth}px`;
					},
				},
			});
		} else {
			gsap.set([contentRef.current, cloneRef.current], { x: -contentWidth });

			timeline.to([contentRef.current, cloneRef.current], {
				x: 0,
				duration,
				ease: 'none',
				modifiers: {
					x: (x) => {
						const xValue = parseFloat(x);
						return `${(((xValue % contentWidth) + contentWidth) % contentWidth) - contentWidth}px`;
					},
				},
			});
		}

		timelineRef.current = timeline;
	}, [direction, speed]);

	const handleMouseEnter = useCallback(() => {
		if (pauseOnHover && timelineRef.current) {
			timelineRef.current.pause();
		}
	}, [pauseOnHover]);

	const handleMouseLeave = useCallback(() => {
		if (pauseOnHover && timelineRef.current) {
			timelineRef.current.resume();
		}
	}, [pauseOnHover]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			initializeAnimation();
		}, 100);

		const handleResize = () => {
			initializeAnimation();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener('resize', handleResize);
		};
	}, [initializeAnimation]);

	useEffect(() => {
		return () => {
			if (timelineRef.current) {
				timelineRef.current.kill();
				timelineRef.current = null;
			}
		};
	}, []);

	return (
		<div ref={containerRef} className={cn('relative w-full overflow-hidden', className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<div className='flex w-fit'>
				<div ref={contentRef} className='flex shrink-0'>
					{children}
				</div>
				<div ref={cloneRef} className='flex shrink-0' aria-hidden='true'>
					{children}
				</div>
			</div>
		</div>
	);
};

export const GsapMarquee = memo(GsapMarqueeComponent);
GsapMarquee.displayName = 'GsapMarquee';

export default GsapMarquee;
