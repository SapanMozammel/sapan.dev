import { ReactNode } from 'react';

// Base item type for diamond grid items
export type DiamondGridItem = {
	name: string;
	logo?: string;
	index?: number;
};

// Legacy props type for backward compatibility
export type DiamondGridLegacyProps = {
	items: DiamondGridItem[];
	children?: (item: DiamondGridItem & { index: number }, itemIndex: number) => ReactNode;
	className?: string;
};

// New flexible props type
export type DiamondGridFlexibleProps = {
	children: ReactNode;
	className?: string;
};

// Union type to support both patterns
export type DiamondGridProps = DiamondGridLegacyProps | DiamondGridFlexibleProps;

// Layout configuration type for diamond patterns
export type LayoutConfig = {
	maxItems: number;
	columns: number;
	pattern: number[];
};

// Column group type for organizing items in diamond layout
export type ColumnGroup = {
	content: ReactNode | DiamondGridItem;
	index: number;
};

// Diamond column component props type
export type DiamondColumnProps = {
	columnItems: ColumnGroup[];
	columnIndex: number;
	renderContent: (content: ReactNode | DiamondGridItem, index: number, key: string) => ReactNode;
};

// Layout configuration constants type
export type LayoutConfigMap = Record<'large' | 'medium' | 'small', LayoutConfig>;
