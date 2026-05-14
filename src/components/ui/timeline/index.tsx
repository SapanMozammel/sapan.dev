'use client';

import { cn } from '@/lib/utils';
import type { TimelineProps } from '@/types/experience';
import { useScroll } from 'framer-motion';
import { memo, useEffect, useRef, useState } from 'react';

import TimelineItem from './timeline-item';
import TimelineProgressBar from './timeline-progress-bar';

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
	// Cached per-item dot elements — queried once at setup, never on every scroll tick
	const itemDotsCache = useRef<HTMLElement[][]>([]);
	// Track which items have already faded in — avoids getBoundingClientRect on revealed items
	const revealedItems = useRef<boolean[]>([]);

	useEffect(() => {
		let rafId: number;

		const handleScroll = () => {
			if (!timelineRef.current) {
				return;
			}

			// --- Read phase (all layout reads before any writes) ---
			const scrollPos = window.scrollY + window.innerHeight / 2;
			const containerTop = timelineRef.current.getBoundingClientRect().top + window.scrollY;
			const isDesktop = window.innerWidth >= 768;
			const startY = isDesktop ? 42 : 10;
			const vh = window.innerHeight;

			// Populate caches on first call
			if (itemRefs.current.length === 0) {
				itemRefs.current = Array.from(timelineRef.current.querySelectorAll('[data-timeline-item]')) as HTMLElement[];
				itemDotsCache.current = itemRefs.current.map((el) => Array.from(el.querySelectorAll('[data-timeline-dot]')) as HTMLElement[]);
				revealedItems.current = itemRefs.current.map(() => false);
			}

			const len = Math.min(itemRefs.current.length, heights.length);

			// Read bounding rects for unrevealed items only (batched before any writes)
			const itemTops: (number | null)[] = new Array(len);
			for (let i = 0; i < len; i++) {
				itemTops[i] = revealedItems.current[i] ? null : itemRefs.current[i].getBoundingClientRect().top;
			}

			// --- Write phase ---
			for (let i = 0; i < len; i++) {
				const dotAbsoluteY = containerTop + heights[i] + startY;
				const active = scrollPos >= dotAbsoluteY;
				const dots = itemDotsCache.current[i];

				for (let d = 0; d < dots.length; d++) {
					const el = dots[d];
					if (active) {
						el.classList.add('bg-primary', 'dark:bg-success', 'border-indigo-100', 'dark:border-teal-900');
						el.classList.remove('bg-secondary-300', 'dark:bg-secondary-700', 'border-secondary-100', 'dark:border-secondary-800');
					} else {
						el.classList.remove('bg-primary', 'dark:bg-success', 'border-indigo-100', 'dark:border-teal-900');
						el.classList.add('bg-secondary-300', 'dark:bg-secondary-700', 'border-secondary-100', 'dark:border-secondary-800');
					}
				}

				// Reveal fade-in — skip items already revealed
				if (!revealedItems.current[i] && itemTops[i] !== null && (itemTops[i] as number) < vh * 0.85) {
					itemRefs.current[i].style.opacity = '1';
					itemRefs.current[i].style.transform = 'translateY(0)';
					revealedItems.current[i] = true;
				}
			}
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
			itemDotsCache.current = [];
			revealedItems.current = [];
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
