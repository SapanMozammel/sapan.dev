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

const SCALE_SMOOTHING = 12;
const SCALE_EPSILON = 0.0005;

export const useStackingCards = (options: UseStackingCardsOptions = {}) => {
	const { topStart = DEFAULT_TOP_START, topIncrement = DEFAULT_TOP_INCREMENT, defaultMinScale = DEFAULT_MIN_SCALE, gap = DEFAULT_GAP, enabled = DEFAULT_ENABLED } = options;
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!enabled || !containerRef.current) {
			return;
		}
		const container = containerRef.current;
		const cards = Array.from(container.children) as HTMLElement[];

		if (cards.length <= 1) {
			return;
		}

		let isUnmounted = false;
		const scaleValues = generateScaleValues(cards.length, defaultMinScale);
		const lastCardIndex = cards.length - 1;
		const secondToLastCardTop = topStart + (lastCardIndex - 1) * topIncrement;
		const cardStickyTops: number[] = [];
		for (let i = 0; i < cards.length; i++) {
			cardStickyTops[i] = topStart + i * topIncrement;
		}

		const triggers: ScrollTrigger[] = [];

		const currentScales: number[] = new Array(cards.length).fill(1);
		const targetScales: number[] = new Array(cards.length).fill(1);
		let isConverging = false;

		const cardHeights: number[] = [];
		const cardsLength = cards.length;
		for (let i = 0; i < cardsLength; i++) {
			cardHeights[i] = cards[i].offsetHeight;
		}

		cards.forEach((card, index) => {
			const topPosition = cardStickyTops[index];
			gsap.set(card, {
				zIndex: index + 1,
				transformOrigin: 'center top',
				marginBottom: index < cards.length - 1 ? gap : 0,
				willChange: 'transform',
			});

			let totalStackingDistance = 0;
			for (let i = index + 1; i < cards.length; i++) {
				totalStackingDistance += cardHeights[i];
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
			});

			triggers.push(trigger);
		});

		const tickerCallback = (_time: number, deltaTime: number) => {
			if (isUnmounted) {
				return;
			}
			let anyActive = false;
			for (let i = 0; i < triggers.length; i++) {
				if (triggers[i].isActive) {
					anyActive = true;
					break;
				}
			}
			if (!anyActive && !isConverging) {
				return;
			}

			const lastCardTop = cards[lastCardIndex].getBoundingClientRect().top;

			for (let cardIndex = 0; cardIndex < cardsLength; cardIndex++) {
				const cardTargetScale = scaleValues[cardIndex];
				const cardStickyTop = cardStickyTops[cardIndex];
				const cardTrigger = triggers[cardIndex];
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

				targetScales[cardIndex] = shouldReverseScale ? cardTargetScale + reverseScaleProgress * (defaultMinScale - cardTargetScale) : forwardScale;
			}

			const dt = Math.min(deltaTime / 1000, 0.1); // Cap at 100ms to prevent huge jumps after tab switch
			const lerpFactor = 1 - Math.exp(-SCALE_SMOOTHING * dt);

			isConverging = false;

			for (let i = 0; i < cardsLength; i++) {
				const target = targetScales[i];
				const current = currentScales[i];
				const diff = target - current;

				if (Math.abs(diff) > SCALE_EPSILON) {
					const newScale = current + diff * lerpFactor;
					currentScales[i] = newScale;
					gsap.set(cards[i], { scale: newScale });
					isConverging = true;
				} else if (current !== target) {
					currentScales[i] = target;
					gsap.set(cards[i], { scale: target });
				}
			}
		};

		gsap.ticker.add(tickerCallback);
		ScrollTrigger.refresh();

		return () => {
			isUnmounted = true;
			gsap.ticker.remove(tickerCallback);
			triggers.forEach((trigger) => trigger.kill());
			for (let i = 0; i < cardsLength; i++) {
				const card = cards[i];
				gsap.set(card, { willChange: 'auto' });
				gsap.set(card, { clearProps: 'all' });
			}
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
