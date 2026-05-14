'use client';

import { cn } from '@/lib/utils/index';
import React, { Children, memo, useMemo, type ReactNode } from 'react';

type DiamondGridProps = {
	children: ReactNode;
	className?: string;
};

type LayoutConfig = {
	maxItems: number;
	columns: number;
	pattern: number[];
};

type ColumnGroup = {
	content: ReactNode;
	index: number;
};

type DiamondColumnProps = {
	columnItems: ColumnGroup[];
	columnIndex: number;
};

const LAYOUT_CONFIGS = {
	large: { maxItems: 16, columns: 7, pattern: [1, 2, 3, 4, 3, 2, 1] },
	medium: { maxItems: 9, columns: 5, pattern: [1, 2, 3, 2, 1] },
	small: { maxItems: 4, columns: 3, pattern: [1, 2, 1] },
} as const satisfies Record<string, LayoutConfig>;

const DiamondColumn = memo<DiamondColumnProps>(({ columnItems, columnIndex }) => (
	<div
		className='flex flex-col items-center justify-center gap-[0.75vw]'
		style={{
			gridColumn: columnIndex + 1,
		}}
	>
		{columnItems.map((item) => (
			<React.Fragment key={`column-${columnIndex}-item-${item.index}`}>{item.content}</React.Fragment>
		))}
	</div>
));

DiamondColumn.displayName = 'DiamondColumn';

const DiamondGrid = memo<DiamondGridProps>(({ children, className }) => {
	const childrenArray = useMemo(() => Children.toArray(children), [children]);
	const totalItems = childrenArray.length;

	const diamondLayoutConfig = useMemo((): LayoutConfig => {
		if (totalItems >= 16) return LAYOUT_CONFIGS.large;
		if (totalItems >= 9) return LAYOUT_CONFIGS.medium;
		if (totalItems >= 4) return LAYOUT_CONFIGS.small;
		return { maxItems: totalItems, columns: Math.min(totalItems, 3), pattern: [] };
	}, [totalItems]);

	const displayedItems = useMemo(() => childrenArray.slice(0, diamondLayoutConfig.maxItems), [childrenArray, diamondLayoutConfig.maxItems]);

	const diamondColumnGroups = useMemo((): ColumnGroup[][] => {
		const columns: ColumnGroup[][] = Array.from({ length: diamondLayoutConfig.columns }, () => []);
		let itemIndex = 0;

		if (diamondLayoutConfig.pattern.length === 0) {
			for (let col = 0; col < diamondLayoutConfig.columns && itemIndex < displayedItems.length; col++) {
				columns[col].push({ content: displayedItems[itemIndex], index: itemIndex });
				itemIndex++;
			}
			return columns;
		}

		for (let columnIndex = 0; columnIndex < diamondLayoutConfig.pattern.length && itemIndex < displayedItems.length; columnIndex++) {
			const itemsInColumn = diamondLayoutConfig.pattern[columnIndex];
			for (let i = 0; i < itemsInColumn && itemIndex < displayedItems.length; i++) {
				columns[columnIndex].push({ content: displayedItems[itemIndex], index: itemIndex });
				itemIndex++;
			}
		}

		return columns;
	}, [diamondLayoutConfig, displayedItems]);

	const gridTemplateColumns = useMemo(() => `repeat(${diamondLayoutConfig.columns}, minmax(0, 1fr))`, [diamondLayoutConfig.columns]);

	return (
		<div className={cn('flex w-full flex-col gap-4', className)}>
			{/* Mobile layout: 4 items per row (< md) */}
			<div className='grid grid-cols-4 gap-[1vw] md:hidden'>
				{childrenArray.map((item, index) => (
					<React.Fragment key={`mobile-${index}`}>{item}</React.Fragment>
				))}
			</div>

			{/* Large screens: Diamond pattern (>= md) */}
			<div
				className='hidden w-full gap-[0.75vw] md:grid'
				style={{
					gridTemplateColumns,
					justifyContent: 'center',
					alignContent: 'center',
				}}
			>
				{diamondColumnGroups.map((columnItems, columnIndex) => (
					<DiamondColumn key={`column-${columnIndex}`} columnItems={columnItems} columnIndex={columnIndex} />
				))}
			</div>
		</div>
	);
});

DiamondGrid.displayName = 'DiamondGrid';

export { DiamondGrid };
