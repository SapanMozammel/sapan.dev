export type CursorTooltipProps = {
	children: React.ReactNode;
	content: React.ReactNode;
	className?: string;
	offset?: { x: number; y: number };
	/** Custom class for tooltip content when content is a string */
	contentClassName?: string;
};

export type Position = {
	x: number;
	y: number;
};

export type TooltipContentProps = {
	children: React.ReactNode;
	className?: string;
};
