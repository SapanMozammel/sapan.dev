export type UseStackingCardsOptions = {
	topStart?: number;
	topIncrement?: number;
	defaultMinScale?: number;
	enabled?: boolean;
};

export type StackingCardConfig = {
	stickyTop: number;
	indexOffset: number;
	topIncrement: number;
	zIndex: number;
	targetScale: number;
	reverseTargetScale: number;
	range: [number, number];
	isLast: boolean;
};
