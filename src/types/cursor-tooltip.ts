export type CursorTooltipProps = {
	children: React.ReactNode;
	content: string;
	className?: string;
	offset?: { x: number; y: number };
};

export type Position = {
	x: number;
	y: number;
};
