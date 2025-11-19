'use client';

import type { UseStackingCardsOptions } from '@/types/stacking-cards';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_TOP_START = 120;
const DEFAULT_TOP_INCREMENT = 20;
const DEFAULT_MIN_SCALE = 0.9;
const DEFAULT_GAP = 0;
const DEFAULT_ENABLED = true;

/**
 * Custom hook for creating a stacking card animation effect using GSAP ScrollTrigger
 *
 * @param options - Configuration options for the stacking animation
 * @returns A ref to attach to the container element
 */
export const useStackingCards = (options: UseStackingCardsOptions = {}) => {
	const {
		topStart = DEFAULT_TOP_START,
		topIncrement = DEFAULT_TOP_INCREMENT,
		defaultMinScale = DEFAULT_MIN_SCALE,
		gap = DEFAULT_GAP,
		enabled = DEFAULT_ENABLED,
	} = options;

	const containerRef = useRef<HTMLDivElement>(null);
	const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
	const scalingStoppedRef = useRef<boolean>(false);
	const finalScalesRef = useRef<number[]>([]);

	useEffect(() => {
		if (!enabled || !containerRef.current) {
			return;
		}

		const container = containerRef.current;
		const cards = Array.from(container.children) as HTMLElement[];

		scrollTriggersRef.current.forEach((trigger) => trigger.kill());
		scrollTriggersRef.current = [];
		scalingStoppedRef.current = false;
		finalScalesRef.current = [];

		if (cards.length <= 1) {
			return;
		}

		const scaleValues = generateScaleValues(cards.length, defaultMinScale);
		const secondToLastIndex = cards.length - 2;

		cards.forEach((card, index) => {
			const topPosition = topStart + index * topIncrement;
			const targetScale = scaleValues[index];

			gsap.set(card, {
				zIndex: index + 1,
				transformOrigin: 'center top',
				marginBottom: index < cards.length - 1 ? gap : 0,
			});

			let totalStackingDistance = 0;
			for (let i = index + 1; i < cards.length; i++) {
				totalStackingDistance += cards[i].offsetHeight;
			}
			totalStackingDistance += (cards.length - index - 1) * gap;

			const trigger = ScrollTrigger.create({
				trigger: card,
				start: `top ${topPosition}px`,
				end: `+=${totalStackingDistance}`,
				pin: true,
				pinSpacing: false,
				scrub: 1,
				invalidateOnRefresh: true,
				anticipatePin: 1,
				onUpdate: (self) => {
					const progress = self.progress;

					if (index === secondToLastIndex && progress > 0 && !scalingStoppedRef.current) {
						scalingStoppedRef.current = true;
						cards.forEach((_card, i) => {
							const currentTrigger = scrollTriggersRef.current[i];
							if (currentTrigger && i < cards.length - 1) {
								const currentProgress = currentTrigger.progress;
								const currentTargetScale = scaleValues[i];
								const lockedScale = 1 - (1 - currentTargetScale) * currentProgress;
								finalScalesRef.current[i] = lockedScale;
							} else {
								finalScalesRef.current[i] = 1;
							}
						});
					}

					if (scalingStoppedRef.current) {
						gsap.set(card, { scale: finalScalesRef.current[index] || 1 });
					} else {
						const currentScale = 1 - (1 - targetScale) * progress;
						gsap.set(card, { scale: currentScale });
					}
				},
				onLeave: () => {
					if (scalingStoppedRef.current && finalScalesRef.current[index]) {
						gsap.set(card, { scale: finalScalesRef.current[index] });
					} else if (index > 0) {
						gsap.set(card, { scale: scaleValues[index - 1] });
					}
				},
			});

			scrollTriggersRef.current.push(trigger);
		});

		ScrollTrigger.refresh();

		return () => {
			scrollTriggersRef.current.forEach((trigger) => trigger.kill());
			scrollTriggersRef.current = [];
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			cards.forEach((card) => {
				gsap.set(card, { clearProps: 'all' });
			});
		};
	}, [enabled, topStart, topIncrement, defaultMinScale, gap]);

	return containerRef;
};

/**
 * Generate scale values for cards based on count
 */
function generateScaleValues(count: number, minScale: number): number[] {
	if (count === 0) {
		return [];
	}

	if (count <= 2) {
		return Array(count).fill(1.0);
	}

	const values: number[] = [];
	const scalingSectionCount = count - 1;

	for (let i = 0; i < scalingSectionCount; i++) {
		const progress = i / (scalingSectionCount - 1);
		const scale = minScale + progress * (1.0 - minScale);
		values.push(Number(scale.toPrecision(6)));
	}

	values.push(1.0);

	return values;
}
