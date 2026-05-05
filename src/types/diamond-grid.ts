import type { ReactNode } from 'react';

export type DiamondGridItem = {
	name: string;
	logo?: string;
	index?: number;
};

export type DiamondGridProps = {
	children: ReactNode;
	className?: string;
};

export type LayoutConfig = {
	maxItems: number;
	columns: number;
	pattern: number[];
};

export type ColumnGroup = {
	content: ReactNode;
	index: number;
};

export type DiamondColumnProps = {
	columnItems: ColumnGroup[];
	columnIndex: number;
};
