export type UseStackingCardsOptions = {
	topStart?: number;
	topIncrement?: number;
	defaultMinScale?: number;
	enabled?: boolean;
};

export type StackingCardConfig = {
	stickyTop: number;
	indexOffset: number;
	zIndex: number;
	targetScale: number;
	range: [number, number];
};
