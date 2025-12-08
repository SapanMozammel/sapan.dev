'use client';

import type { ScaleCache, UseStackingCardsOptions } from '@/types/stacking-cards';
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
	const scaleCacheRef = useRef<ScaleCache>({});
	const updatesArrayRef = useRef<Array<{ card: HTMLElement; scale: number }>>([]);
	useEffect(() => {
		if (!enabled || !containerRef.current) {
			return;
		}
		const container = containerRef.current;
		const cards = Array.from(container.children) as HTMLElement[];
		scrollTriggersRef.current.forEach((trigger) => trigger.kill());
		scrollTriggersRef.current = [];
		if (rafIdRef.current !== null) {
			cancelAnimationFrame(rafIdRef.current);
			rafIdRef.current = null;
		}
		if (cards.length <= 1) {
			return () => {
				if (rafIdRef.current !== null) {
					cancelAnimationFrame(rafIdRef.current);
					rafIdRef.current = null;
				}
			};
		}
		let isUnmounted = false;
		const scaleValues = generateScaleValues(cards.length, defaultMinScale);
		const lastCardIndex = cards.length - 1;
		const secondToLastCardTop = topStart + (lastCardIndex - 1) * topIncrement;
		const cardStickyTops: number[] = [];
		for (let i = 0; i < cards.length; i++) {
			cardStickyTops[i] = topStart + i * topIncrement;
		}
		cachedValuesRef.current = {
			scaleValues,
			lastCardIndex,
			secondToLastCardTop,
			cardStickyTops,
			cards,
		};
		scaleCacheRef.current = {};
		for (let i = 0; i < cards.length; i++) {
			scaleCacheRef.current[i] = scaleValues[i] || 1;
		}
		let isUpdating = false;
		let cachedLastCardTop: number | null = null;
		let cachedLastCardTopTime = 0;
		const CACHE_DURATION = 16; // ~1 frame at 60fps
		let hasActiveTriggers = false;
		const updateActiveTriggersCache = () => {
			hasActiveTriggers = scrollTriggersRef.current.some((trigger) => trigger.isActive);
		};
		const updatesArray = updatesArrayRef.current;
		const updateAllCardsScale = () => {
			if (isUpdating || isUnmounted) {
				return;
			}
			isUpdating = true;
			rafIdRef.current = requestAnimationFrame(() => {
				if (isUnmounted) {
					isUpdating = false;
					return;
				}
				const cached = cachedValuesRef.current;
				if (!cached) {
					isUpdating = false;
					return;
				}
				const now = performance.now();
				let lastCardTop: number;
				if (cachedLastCardTop !== null && now - cachedLastCardTopTime < CACHE_DURATION) {
					lastCardTop = cachedLastCardTop;
				} else {
					const lastCard = cached.cards[cached.lastCardIndex];
					lastCardTop = lastCard.getBoundingClientRect().top;
					cachedLastCardTop = lastCardTop;
					cachedLastCardTopTime = now;
				}
				updatesArray.length = 0;
				const { cards, scaleValues, cardStickyTops, lastCardIndex, secondToLastCardTop } = cached;
				const cardsLength = cards.length;
				const triggers = scrollTriggersRef.current;
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
					const finalScale = shouldReverseScale ? cardTargetScale + reverseScaleProgress * (defaultMinScale - cardTargetScale) : forwardScale;
					const roundedScale = Math.round(finalScale * 1000) / 1000;
					if (scaleCacheRef.current[cardIndex] !== roundedScale) {
						scaleCacheRef.current[cardIndex] = roundedScale;
						updatesArray.push({
							card: cards[cardIndex],
							scale: finalScale,
						});
					}
				}
				const updatesLength = updatesArray.length;
				if (updatesLength > 0) {
					for (let i = 0; i < updatesLength; i++) {
						const { card, scale } = updatesArray[i];
						gsap.set(card, { scale });
					}
				}
				isUpdating = false;
			});
		};
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
				willChange: 'transform', // Hint to browser for GPU optimization
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
				onEnter: () => {
					updateActiveTriggersCache();
				},
				onEnterBack: () => {
					updateActiveTriggersCache();
				},
				onLeave: () => {
					if (!isUnmounted) {
						const currentScale = gsap.getProperty(card, 'scale') as number;
						gsap.set(card, { scale: currentScale });
					}
					updateActiveTriggersCache();
				},
				onLeaveBack: () => {
					updateActiveTriggersCache();
				},
			});
			scrollTriggersRef.current.push(trigger);
		});
		updateActiveTriggersCache();
		let lastScrollTime = 0;
		const SCROLL_THROTTLE_MS = 16; // ~60fps
		const scrollUpdateHandler = () => {
			const now = performance.now();
			if (now - lastScrollTime < SCROLL_THROTTLE_MS) {
				return;
			}
			lastScrollTime = now;
			if (hasActiveTriggers) {
				updateAllCardsScale();
			}
		};
		window.addEventListener('scroll', scrollUpdateHandler, { passive: true });
		const scrollEndHandler = () => {
			if (!isUnmounted) {
				updateAllCardsScale();
			}
		};
		ScrollTrigger.addEventListener('scrollEnd', scrollEndHandler);
		ScrollTrigger.refresh();

		return () => {
			isUnmounted = true;
			if (rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
				rafIdRef.current = null;
			}
			window.removeEventListener('scroll', scrollUpdateHandler);
			ScrollTrigger.removeEventListener('scrollEnd', scrollEndHandler);
			scrollTriggersRef.current.forEach((trigger) => trigger.kill());
			scrollTriggersRef.current = [];
			cachedValuesRef.current = null;
			scaleCacheRef.current = {};
			updatesArrayRef.current.length = 0;
			const cardsLength = cards.length;
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
