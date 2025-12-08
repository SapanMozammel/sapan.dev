export type UseStackingCardsOptions = {
	topStart?: number;
	topIncrement?: number;
	defaultMinScale?: number;
	gap?: number;
	enabled?: boolean;
};

export type ScaleCache = {
	[key: number]: number;
};
