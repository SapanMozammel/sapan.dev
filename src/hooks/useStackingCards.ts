'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

type UseStackingCardsOptions = {
	topStart?: number;
	topIncrement?: number;
	defaultMinScale?: number;
	gap?: number;
	enabled?: boolean;
};

/**
 * Custom hook for creating a stacking card animation effect using GSAP ScrollTrigger
 * Matches the exact behavior from brixagency.com
 *
 * @param options - Configuration options for the stacking animation
 * @param options.topStart - Starting top position in pixels (default: 120)
 * @param options.topIncrement - Increment for each card's top position (default: 20)
 * @param options.defaultMinScale - Minimum scale for cards (default: 0.9)
 * @param options.gap - Gap between cards in pixels (default: 0)
 * @param options.enabled - Whether the animation is enabled (default: true)
 *
 * @returns A ref to attach to the container element
 */
export const useStackingCards = (options: UseStackingCardsOptions = {}) => {
	const { topStart = 120, topIncrement = 20, defaultMinScale = 0.9, gap = 0, enabled = true } = options;

	const containerRef = useRef<HTMLDivElement>(null);
	const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

	useEffect(() => {
		if (!enabled || !containerRef.current) {
			return;
		}

		const container = containerRef.current;
		const cards = Array.from(container.children) as HTMLElement[];

		// Clear any existing ScrollTriggers
		scrollTriggersRef.current.forEach((trigger) => trigger.kill());
		scrollTriggersRef.current = [];

		// Don't apply animation if there are no cards or only one card
		if (cards.length <= 1) {
			return;
		}

		// Generate scale values based on card count
		const scaleValues = generateScaleValues(cards.length, defaultMinScale);

		// Set up each card with pinning and scaling
		cards.forEach((card, index) => {
			const topPosition = topStart + index * topIncrement;
			const targetScale = scaleValues[index];

			// Set initial state with gap
			gsap.set(card, {
				zIndex: index + 1,
				transformOrigin: 'center top',
				marginBottom: index < cards.length - 1 ? gap : 0,
			});

			// Calculate total stacking distance - all cards unpin when last card reaches its position
			let totalStackingDistance = 0;

			// Sum up the heights of all cards after this one
			for (let i = index + 1; i < cards.length; i++) {
				totalStackingDistance += cards[i].offsetHeight;
			}

			// Add spacing between cards
			const remainingGaps = cards.length - index - 1;
			totalStackingDistance += remainingGaps * gap;

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

					// Normal scaling during stacking phase
					const currentScale = 1 - (1 - targetScale) * progress;
					gsap.set(card, {
						scale: currentScale,
					});
				},
				onLeave: () => {
					// When card unpins and starts leaving, inherit scale from previous card
					if (index > 0) {
						const previousCardScale = scaleValues[index - 1];
						gsap.set(card, {
							scale: previousCardScale,
						});
					}
				},
			});

			scrollTriggersRef.current.push(trigger);
		});

		// Refresh ScrollTrigger after setup
		ScrollTrigger.refresh();

		// Cleanup function
		return () => {
			scrollTriggersRef.current.forEach((trigger) => trigger.kill());
			scrollTriggersRef.current = [];
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

			// Reset card styles
			cards.forEach((card) => {
				gsap.set(card, {
					clearProps: 'all',
				});
			});
		};
	}, [enabled, topStart, topIncrement, defaultMinScale, gap]);

	return containerRef;
};

/**
 * Generate scale values for cards based on count
 */
function generateScaleValues(count: number, minScale: number): number[] {
	if (count === 0) return [];

	const values: number[] = [];

	// Handle edge cases
	if (count <= 2) {
		for (let i = 0; i < count; i++) {
			values.push(1.0);
		}
		return values;
	}

	// For count >= 3: Apply progressive scaling with last card at 1.0
	const scalingSectionCount = count - 1;
	const targetScale = 1.0;

	// Generate scale values for scaling cards (all except last)
	for (let i = 0; i < scalingSectionCount; i++) {
		const progress = i / (scalingSectionCount - 1);
		const scale = minScale + progress * (targetScale - minScale);
		values.push(Number(scale.toPrecision(6)));
	}

	// Last card always has scale = 1.0
	values.push(1.0);

	return values;
}
