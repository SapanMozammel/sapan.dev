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

export const useStackingCards = (options: UseStackingCardsOptions = {}) => {
	const { topStart = DEFAULT_TOP_START, topIncrement = DEFAULT_TOP_INCREMENT, defaultMinScale = DEFAULT_MIN_SCALE, gap = DEFAULT_GAP, enabled = DEFAULT_ENABLED } = options;

	const containerRef = useRef<HTMLDivElement>(null);
	const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

	useEffect(() => {
		if (!enabled || !containerRef.current) {
			return;
		}

		const container = containerRef.current;
		const cards = Array.from(container.children) as HTMLElement[];

		scrollTriggersRef.current.forEach((trigger) => trigger.kill());
		scrollTriggersRef.current = [];

		if (cards.length <= 1) {
			return;
		}

		const scaleValues = generateScaleValues(cards.length, defaultMinScale);
		const lastCardIndex = cards.length - 1;
		const secondToLastCardTop = topStart + (lastCardIndex - 1) * topIncrement;

		let isUpdating = false;
		const updateAllCardsScale = () => {
			if (isUpdating) {
				return;
			}
			isUpdating = true;

			requestAnimationFrame(() => {
				const lastCard = cards[lastCardIndex];
				const lastCardTop = lastCard.getBoundingClientRect().top;

				cards.forEach((cardToUpdate, cardIndex) => {
					const cardTargetScale = scaleValues[cardIndex];
					const cardStickyTop = topStart + cardIndex * topIncrement;
					const cardTrigger = scrollTriggersRef.current[cardIndex];
					const cardProgress = cardTrigger?.progress ?? 0;

					const forwardScale = 1 - (1 - cardTargetScale) * cardProgress;

					let shouldReverseScale = false;
					let reverseScaleProgress = 0;

					if (cardIndex === lastCardIndex) {
						if (lastCardIndex > 0 && lastCardTop <= secondToLastCardTop) {
							shouldReverseScale = true;
							const animationRange = secondToLastCardTop - topStart;
							if (animationRange > 0) {
								reverseScaleProgress = Math.max(0, Math.min(1, (secondToLastCardTop - lastCardTop) / animationRange));
							}
						}
					} else {
						if (lastCardTop < cardStickyTop) {
							shouldReverseScale = true;
							const animationRange = cardStickyTop - topStart;
							if (animationRange > 0) {
								reverseScaleProgress = Math.max(0, Math.min(1, (cardStickyTop - lastCardTop) / animationRange));
							}
						}
					}

					const finalScale = shouldReverseScale ? cardTargetScale + reverseScaleProgress * (defaultMinScale - cardTargetScale) : forwardScale;

					gsap.set(cardToUpdate, { scale: finalScale });
				});

				isUpdating = false;
			});
		};

		cards.forEach((card, index) => {
			const topPosition = topStart + index * topIncrement;

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
				onUpdate: updateAllCardsScale,
				onLeave: () => {
					const currentScale = gsap.getProperty(card, 'scale') as number;
					gsap.set(card, { scale: currentScale });
				},
			});

			scrollTriggersRef.current.push(trigger);
		});

		ScrollTrigger.refresh();

		return () => {
			scrollTriggersRef.current.forEach((trigger) => trigger.kill());
			scrollTriggersRef.current = [];
			cards.forEach((card) => {
				gsap.set(card, { clearProps: 'all' });
			});
		};
	}, [enabled, topStart, topIncrement, defaultMinScale, gap]);

	return containerRef;
};

const generateScaleValues = (count: number, minScale: number): number[] => {
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
};
