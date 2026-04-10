'use client';

import { cn } from '@/lib/utils';
import type { TimelineProps } from '@/types/experience';
import { useScroll } from 'framer-motion';
import { memo, useEffect, useRef, useState } from 'react';

import TimelineItem from './TimelineItem';
import TimelineProgressBar from './TimelineProgressBar';

const Timeline = memo<TimelineProps>(({ items, className }) => {
	const timelineRef = useRef<HTMLDivElement>(null);
	const [heights, setHeights] = useState<number[]>([]);
	const [totalHeight, setTotalHeight] = useState(100);

	useEffect(() => {
		const updateHeights = () => {
			if (!timelineRef.current) {
				return;
			}
			const itemElements = Array.from(timelineRef.current.querySelectorAll('[data-timeline-item]')) as HTMLElement[];

			const newHeights = itemElements.map((el) => el.offsetTop);
			setHeights(newHeights);

			setTotalHeight(timelineRef.current.offsetHeight);
		};

		const timer = setTimeout(updateHeights, 150);
		window.addEventListener('resize', updateHeights);
		window.addEventListener('load', updateHeights);
		return () => {
			clearTimeout(timer);
			window.removeEventListener('resize', updateHeights);
			window.removeEventListener('load', updateHeights);
		};
	}, [items]);

	const { scrollYProgress } = useScroll({
		target: timelineRef,
		offset: ['start center', 'end center'],
	});

	const itemRefs = useRef<HTMLElement[]>([]);

	useEffect(() => {
		let rafId: number;

		const handleScroll = () => {
			if (!timelineRef.current) {
				return;
			}
			const scrollPos = window.scrollY + window.innerHeight / 2;
			const containerTop = timelineRef.current.getBoundingClientRect().top + window.scrollY;
			const isDesktop = window.innerWidth >= 768;
			const startY = isDesktop ? 42 : 10;

			if (itemRefs.current.length === 0) {
				itemRefs.current = Array.from(timelineRef.current.querySelectorAll('[data-timeline-item]')) as HTMLElement[];
			}

			itemRefs.current.forEach((itemEl, i) => {
				if (i >= heights.length) {
					return;
				}
				const dotAbsoluteY = containerTop + heights[i] + startY;
				const itemDots = itemEl.querySelectorAll('[data-timeline-dot]');

				itemDots.forEach((innerDot) => {
					const el = innerDot as HTMLElement;
					if (scrollPos >= dotAbsoluteY) {
						el.classList.add('bg-primary', 'dark:bg-success', 'border-indigo-100', 'dark:border-teal-900');
						el.classList.remove('bg-secondary-300', 'dark:bg-secondary-700', 'border-secondary-100', 'dark:border-secondary-800');
					} else {
						el.classList.remove('bg-primary', 'dark:bg-success', 'border-indigo-100', 'dark:border-teal-900');
						el.classList.add('bg-secondary-300', 'dark:bg-secondary-700', 'border-secondary-100', 'dark:border-secondary-800');
					}
				});

				const rect = itemEl.getBoundingClientRect();
				if (rect.top < window.innerHeight * 0.85) {
					itemEl.style.opacity = '1';
					itemEl.style.transform = 'translateY(0)';
				}
			});
		};

		const onScroll = () => {
			rafId = requestAnimationFrame(handleScroll);
		};

		if (timelineRef.current) {
			const itemsToAnimate = timelineRef.current.querySelectorAll('[data-timeline-item]');
			itemsToAnimate.forEach((el) => {
				(el as HTMLElement).style.opacity = '0';
				(el as HTMLElement).style.transform = 'translateY(40px)';
				(el as HTMLElement).style.transition = 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
			});
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		handleScroll();
		return () => {
			window.removeEventListener('scroll', onScroll);
			cancelAnimationFrame(rafId);
			itemRefs.current = [];
		};
	}, [heights]);

	return (
		<div className={cn('relative w-full', className)}>
			<TimelineProgressBar heights={heights} totalHeight={totalHeight} containerRef={timelineRef} scrollYProgress={scrollYProgress} />

			<div ref={timelineRef} className='relative z-10 mx-auto w-full'>
				{items.map((item, index) => (
					<TimelineItem key={item.id} item={item} index={index} isLast={index === items.length - 1} />
				))}
			</div>
		</div>
	);
});

Timeline.displayName = 'Timeline';

export default Timeline;
