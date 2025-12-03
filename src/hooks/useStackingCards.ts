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
	const rafIdRef = useRef<number | null>(null);
	const cachedValuesRef = useRef<{
		scaleValues: number[];
		lastCardIndex: number;
		secondToLastCardTop: number;
		cardStickyTops: number[];
		cards: HTMLElement[];
	} | null>(null);

	useEffect(() => {
		if (!enabled || !containerRef.current) {
			return;
		}

		const container = containerRef.current;
		const cards = Array.from(container.children) as HTMLElement[];

		// Clean up previous triggers
		scrollTriggersRef.current.forEach((trigger) => trigger.kill());
		scrollTriggersRef.current = [];

		// Cancel any pending animation frame
		if (rafIdRef.current !== null) {
			cancelAnimationFrame(rafIdRef.current);
			rafIdRef.current = null;
		}

		if (cards.length <= 1) {
			// Return cleanup for early exit to handle any pending rAF
			return () => {
				if (rafIdRef.current !== null) {
					cancelAnimationFrame(rafIdRef.current);
					rafIdRef.current = null;
				}
			};
		}

		// Track if effect has been cleaned up to prevent stale updates
		let isUnmounted = false;

		// Pre-calculate and cache all values
		const scaleValues = generateScaleValues(cards.length, defaultMinScale);
		const lastCardIndex = cards.length - 1;
		const secondToLastCardTop = topStart + (lastCardIndex - 1) * topIncrement;
		const cardStickyTops = cards.map((_, index) => topStart + index * topIncrement);

		cachedValuesRef.current = {
			scaleValues,
			lastCardIndex,
			secondToLastCardTop,
			cardStickyTops,
			cards,
		};

		// Throttle flag to prevent excessive updates
		let isUpdating = false;

		// Scale update function - uses getBoundingClientRect for accurate position during leave phase
		const updateAllCardsScale = () => {
			if (isUpdating || isUnmounted) return;
			isUpdating = true;

			rafIdRef.current = requestAnimationFrame(() => {
				// Early exit if unmounted or no cached values
				if (isUnmounted) {
					isUpdating = false;
					return;
				}

				const cached = cachedValuesRef.current;
				if (!cached) {
					isUpdating = false;
					return;
				}

				// Use getBoundingClientRect to get actual DOM position
				// This is essential for the reverse scale animation during the leaving phase
				const lastCard = cached.cards[cached.lastCardIndex];
				const lastCardTop = lastCard.getBoundingClientRect().top;

				for (let cardIndex = 0; cardIndex < cached.cards.length; cardIndex++) {
					const cardTargetScale = cached.scaleValues[cardIndex];
					const cardStickyTop = cached.cardStickyTops[cardIndex];
					const cardTrigger = scrollTriggersRef.current[cardIndex];
					const cardProgress = cardTrigger?.progress ?? 0;

					const forwardScale = 1 - (1 - cardTargetScale) * cardProgress;

					let shouldReverseScale = false;
					let reverseScaleProgress = 0;

					if (cardIndex === cached.lastCardIndex) {
						if (cached.lastCardIndex > 0 && lastCardTop <= cached.secondToLastCardTop) {
							shouldReverseScale = true;
							const animationRange = cached.secondToLastCardTop - topStart;
							if (animationRange > 0) {
								reverseScaleProgress = Math.max(0, Math.min(1, (cached.secondToLastCardTop - lastCardTop) / animationRange));
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

					gsap.set(cached.cards[cardIndex], { scale: finalScale });
				}

				isUpdating = false;
			});
		};

		// Calculate card heights for stacking distance
		const cardHeights = cards.map((card) => card.offsetHeight);

		cards.forEach((card, index) => {
			const topPosition = cardStickyTops[index];

			gsap.set(card, {
				zIndex: index + 1,
				transformOrigin: 'center top',
				marginBottom: index < cards.length - 1 ? gap : 0,
				willChange: 'transform', // Hint to browser for GPU optimization
			});

			// Calculate stacking distance using cached heights
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
				// Use only ScrollTrigger's onUpdate for scale updates (removed duplicate scroll listener)
				onUpdate: updateAllCardsScale,
				onLeave: () => {
					// Lock the scale when card leaves (important for leaving behavior)
					if (!isUnmounted) {
						const currentScale = gsap.getProperty(card, 'scale') as number;
						gsap.set(card, { scale: currentScale });
					}
				},
			});

			scrollTriggersRef.current.push(trigger);
		});

		ScrollTrigger.refresh();

		return () => {
			// Mark as unmounted to prevent stale updates
			isUnmounted = true;

			// Cancel pending animation frame to prevent memory leaks
			if (rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
				rafIdRef.current = null;
			}

			// Kill all scroll triggers
			scrollTriggersRef.current.forEach((trigger) => trigger.kill());
			scrollTriggersRef.current = [];

			// Clear cached values
			cachedValuesRef.current = null;

			// Properly clean up GPU-promoted layers and GSAP properties
			cards.forEach((card) => {
				// Reset willChange first to release GPU memory
				gsap.set(card, { willChange: 'auto' });
				// Then clear all GSAP properties
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
