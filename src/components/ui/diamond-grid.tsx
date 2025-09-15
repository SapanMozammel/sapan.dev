import { cn } from '@/lib/utils/index';
import { memo, useMemo } from 'react';

export interface DiamondGridItem {
	name: string;
	index?: number;
}

export interface DiamondGridProps {
	items: DiamondGridItem[];
	children?: (item: DiamondGridItem & { index: number }, itemIndex: number) => React.ReactNode;
	className?: string;
}

interface LayoutConfig {
	maxItems: number;
	columns: number;
	pattern: number[];
}

interface ColumnGroup {
	name: string;
	index: number;
}

const DiamondGrid = memo<DiamondGridProps>(({ items, children, className }) => {
	// Memoize layout configuration to prevent recalculation
	const layoutConfig = useMemo((): LayoutConfig => {
		const totalItems = items.length;
		if (totalItems >= 16) {
			// Use 7-column diamond (1-2-3-4-3-2-1 = 16 items)
			return { maxItems: 16, columns: 7, pattern: [1, 2, 3, 4, 3, 2, 1] };
		} else if (totalItems >= 9) {
			// Use 5-column diamond (1-2-3-2-1 = 9 items)
			return { maxItems: 9, columns: 5, pattern: [1, 2, 3, 2, 1] };
		} else if (totalItems >= 4) {
			// Use 3-column diamond (1-2-1 = 4 items)
			return { maxItems: 4, columns: 3, pattern: [1, 2, 1] };
		} else {
			// Use simple layout for fewer items
			return { maxItems: totalItems, columns: Math.min(totalItems, 3), pattern: [] };
		}
	}, [items.length]);

	const displayedItems = useMemo(() => items.slice(0, layoutConfig.maxItems), [items, layoutConfig.maxItems]);

	// Generate column groups for diamond pattern
	const columnGroups = useMemo((): ColumnGroup[][] => {
		const columns: ColumnGroup[][] = [];
		let itemIndex = 0;

		// Handle simple layout for fewer than 4 items
		if (layoutConfig.pattern.length === 0) {
			for (let col = 0; col < layoutConfig.columns; col++) {
				columns[col] = [];
				if (itemIndex < displayedItems.length) {
					columns[col].push({
						name: displayedItems[itemIndex].name,
						index: itemIndex,
					});
					itemIndex++;
				}
			}
			return columns;
		}

		// Handle diamond pattern positioning
		try {
			layoutConfig.pattern.forEach((itemsInColumn: number, columnIndex: number) => {
				columns[columnIndex] = [];

				for (let i = 0; i < itemsInColumn && itemIndex < displayedItems.length; i++) {
					columns[columnIndex].push({
						name: displayedItems[itemIndex].name,
						index: itemIndex,
					});
					itemIndex++;
				}
			});
		} catch (error) {
			// Fallback to simple layout on error (removed console.error for production)
			for (let col = 0; col < layoutConfig.columns; col++) {
				columns[col] = [];
				if (itemIndex < displayedItems.length) {
					columns[col].push({
						name: displayedItems[itemIndex].name,
						index: itemIndex,
					});
					itemIndex++;
				}
			}
		}

		return columns;
	}, [layoutConfig, displayedItems]);

	// Default render function if no children prop provided
	const defaultRender = (item: DiamondGridItem & { index: number }) => (
		<div key={`${item.name}-${item.index}`} className='flex h-[80px] w-[140px] items-center justify-center rounded-2xl bg-red-400 text-sm font-medium text-white'>
			{item.name}
		</div>
	);

	const renderItem = children || defaultRender;

	return (
		<div
			className={cn('grid w-full gap-4', className)}
			style={{
				gridTemplateColumns: `repeat(${layoutConfig.columns}, minmax(0, 1fr))`,
				justifyContent: 'center',
				alignContent: 'center',
			}}
		>
			{columnGroups.map((columnItems, columnIndex) => (
				<div
					key={`column-${columnIndex}`}
					className='flex flex-col items-center justify-center gap-4'
					style={{
						gridColumn: columnIndex + 1,
					}}
				>
					{columnItems.map((item, itemIndex) => renderItem({ ...item, index: item.index }, itemIndex))}
				</div>
			))}
		</div>
	);
});

DiamondGrid.displayName = 'DiamondGrid';

export { DiamondGrid };
