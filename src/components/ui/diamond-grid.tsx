import { cn } from '@/lib/utils/index';
import type { ColumnGroup, DiamondColumnProps, DiamondGridItem, DiamondGridLegacyProps, DiamondGridProps, LayoutConfig } from '@/types/diamond-grid';
import Image from 'next/image';
import React, { Children, memo, ReactNode, useCallback, useMemo } from 'react';

// Move layout configurations outside component to prevent recreation
const LAYOUT_CONFIGS = {
	large: { maxItems: 16, columns: 7, pattern: [1, 2, 3, 4, 3, 2, 1] },
	medium: { maxItems: 9, columns: 5, pattern: [1, 2, 3, 2, 1] },
	small: { maxItems: 4, columns: 3, pattern: [1, 2, 1] },
} as const satisfies Record<string, LayoutConfig>;

// Type guard to check if props are legacy format
const isLegacyProps = (props: DiamondGridProps): props is DiamondGridLegacyProps => 'items' in props;

// Memoized column component for better performance
const DiamondColumn = memo<DiamondColumnProps>(({ columnItems, columnIndex, renderContent }) => (
	<div
		className='flex flex-col items-center justify-center gap-[0.75vw]'
		style={{
			gridColumn: columnIndex + 1,
		}}
	>
		{columnItems.map((item) => (
			<React.Fragment key={`column-${columnIndex}-item-${item.index}`}>{renderContent(item.content, item.index, `column-${columnIndex}-item-${item.index}`)}</React.Fragment>
		))}
	</div>
));

DiamondColumn.displayName = 'DiamondColumn';

const DiamondGrid = memo<DiamondGridProps>((props) => {
	const { className } = props;

	// Determine if we're using legacy or flexible pattern
	const isLegacy = isLegacyProps(props);

	// Extract children and calculate total items with optimized dependencies
	const { childrenArray, totalItems, renderFunction } = useMemo(() => {
		if (isLegacy) {
			// Legacy pattern: use items array
			const { items, children: renderFn } = props;
			return {
				childrenArray: items,
				totalItems: items.length,
				renderFunction: renderFn,
			};
		} else {
			// Flexible pattern: use React children
			const { children } = props;
			const childrenArray = Children.toArray(children);
			return {
				childrenArray,
				totalItems: childrenArray.length,
				renderFunction: null,
			};
		}
	}, [isLegacy, props]);

	// Optimized layout configuration using pre-defined configs
	const diamondLayoutConfig = useMemo((): LayoutConfig => {
		if (totalItems >= 16) {
			return LAYOUT_CONFIGS.large;
		} else if (totalItems >= 9) {
			return LAYOUT_CONFIGS.medium;
		} else if (totalItems >= 4) {
			return LAYOUT_CONFIGS.small;
		} else {
			// Use simple layout for fewer items
			return { maxItems: totalItems, columns: Math.min(totalItems, 3), pattern: [] };
		}
	}, [totalItems]);

	// For large screens, use diamond layout; for smaller screens, use all items
	const displayedItems = useMemo(() => childrenArray.slice(0, diamondLayoutConfig.maxItems), [childrenArray, diamondLayoutConfig.maxItems]);

	// Optimized column generation with better error handling
	const diamondColumnGroups = useMemo((): ColumnGroup[][] => {
		const columns: ColumnGroup[][] = Array.from({ length: diamondLayoutConfig.columns }, () => []);
		let itemIndex = 0;

		// Handle simple layout for fewer than 4 items
		if (diamondLayoutConfig.pattern.length === 0) {
			for (let col = 0; col < diamondLayoutConfig.columns && itemIndex < displayedItems.length; col++) {
				columns[col].push({
					content: displayedItems[itemIndex],
					index: itemIndex,
				});
				itemIndex++;
			}
			return columns;
		}

		// Handle diamond pattern positioning with optimized loop
		for (let columnIndex = 0; columnIndex < diamondLayoutConfig.pattern.length && itemIndex < displayedItems.length; columnIndex++) {
			const itemsInColumn = diamondLayoutConfig.pattern[columnIndex];

			for (let i = 0; i < itemsInColumn && itemIndex < displayedItems.length; i++) {
				columns[columnIndex].push({
					content: displayedItems[itemIndex],
					index: itemIndex,
				});
				itemIndex++;
			}
		}

		return columns;
	}, [diamondLayoutConfig, displayedItems]);

	// Memoized render function for better performance
	const renderContent = useCallback(
		(content: ReactNode | DiamondGridItem, index: number, key: string) => {
			if (isLegacy && renderFunction) {
				// Legacy pattern: use render function
				const item = content as DiamondGridItem;
				return renderFunction({ ...item, index }, index);
			} else if (isLegacy && !renderFunction) {
				// Legacy pattern with default render
				const item = content as DiamondGridItem;
				return (
					<div key={key} className='relative flex aspect-video w-full items-center justify-center rounded-[1.5vw] bg-red-400 text-sm font-medium text-white md:rounded-[1.25vw]'>
						{item.logo ? (
							<span className='relative h-3/5 w-full'>
								<Image src={item.logo} alt={`${item.name} logo`} fill />
							</span>
						) : (
							<span>{item.name}</span>
						)}
					</div>
				);
			} else {
				// Flexible pattern: render content directly
				return content as ReactNode;
			}
		},
		[isLegacy, renderFunction]
	);

	// Memoized grid template columns to prevent recalculation
	const gridTemplateColumns = useMemo(() => `repeat(${diamondLayoutConfig.columns}, minmax(0, 1fr))`, [diamondLayoutConfig.columns]);

	return (
		<div className={cn('flex w-full flex-col gap-4', className)}>
			{/* Mobile layout: 4 items per row (< md) */}
			<div className='grid grid-cols-4 gap-[1vw] md:hidden'>
				{childrenArray.map((item, index) => (
					<React.Fragment key={`mobile-${index}`}>{renderContent(item, index, `mobile-${index}`)}</React.Fragment>
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
					<DiamondColumn key={`column-${columnIndex}`} columnItems={columnItems} columnIndex={columnIndex} renderContent={renderContent} />
				))}
			</div>
		</div>
	);
});

DiamondGrid.displayName = 'DiamondGrid';

// Export the component
export { DiamondGrid };

// Re-export types for backward compatibility
export type { ColumnGroup, DiamondColumnProps, DiamondGridFlexibleProps, DiamondGridItem, DiamondGridLegacyProps, DiamondGridProps, LayoutConfig } from '@/types/diamond-grid';
