'use client';

import { cn } from '@/lib/utils';
import type { CursorTooltipProps, Position, TooltipContentProps } from '@/types/cursor-tooltip';
import { AnimatePresence, motion } from 'framer-motion';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

// Default tooltip content component for consistent styling
export const TooltipContent = memo<TooltipContentProps>(({ children, className }) => (
	<div className={cn('bg-primary/80 border-primary dark:border-success dark:bg-success/80 pointer-events-none rounded-2xl border-1 border-solid px-3 py-2 text-sm font-medium text-white dark:text-black', className)}>
		{children}
	</div>
));
TooltipContent.displayName = 'TooltipContent';

// Animation constants for better performance and consistency
const ANIMATION_CONFIG = {
	spring: {
		type: 'spring' as const,
		stiffness: 300,
		damping: 30,
		mass: 0.8,
	},
	exit: {
		duration: 0.2,
		ease: [0.4, 0.0, 1, 1] as const,
	},
} as const;

const CursorTooltipComponent: React.FC<CursorTooltipProps> = ({ children, content, className, offset = { x: 0, y: 0 }, contentClassName }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
	const [initialPosition, setInitialPosition] = useState<Position>({ x: 0, y: 0 });
	const containerRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Memoized position calculation for better performance
	const calculateElementCenter = useCallback((element: Element): Position => {
		const rect = element.getBoundingClientRect();
		return {
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2,
		};
	}, []);

	const calculateCursorPosition = useCallback(
		(e: MouseEvent): Position => ({
			x: e.clientX + offset.x,
			y: e.clientY + offset.y,
		}),
		[offset.x, offset.y]
	);

	const updatePosition = useCallback(
		(e: MouseEvent) => {
			setPosition(calculateCursorPosition(e));
		},
		[calculateCursorPosition]
	);

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent) => {
			// Clear any existing timeout for cleanup
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}

			// Calculate positions
			const elementCenter = calculateElementCenter(e.currentTarget);
			const cursorPos = calculateCursorPosition(e.nativeEvent);

			// Set positions and show tooltip
			setInitialPosition(elementCenter);
			setPosition(cursorPos);
			setIsVisible(true);
		},
		[calculateElementCenter, calculateCursorPosition]
	);

	const handleMouseLeave = useCallback(() => {
		setIsVisible(false);
	}, []);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (isVisible) {
				updatePosition(e.nativeEvent);
			}
		},
		[isVisible, updatePosition]
	);

	// Memoized content rendering for performance
	const renderedContent = React.useMemo(() => {
		if (typeof content === 'string') {
			const props: TooltipContentProps = { children: content };
			if (contentClassName) {
				props.className = contentClassName;
			}
			return <TooltipContent {...props} />;
		}
		return content;
	}, [content, contentClassName]);

	// Cleanup timeout on unmount to prevent memory leaks
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
	}, []);

	return (
		<>
			<div ref={containerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} className={cn('cursor-none', className)}>
				{children}
				<AnimatePresence>
					{isVisible && (
						<motion.div
							initial={{
								opacity: 1,
								scale: 0,
								x: initialPosition.x,
								y: initialPosition.y,
								translateX: '-50%',
								translateY: '-50%',
							}}
							animate={{
								opacity: 1,
								scale: 1,
								x: position.x,
								y: position.y,
								translateX: '-50%',
								translateY: '-50%',
							}}
							exit={{
								opacity: 0,
								scale: 0,
								x: initialPosition.x,
								y: initialPosition.y,
								translateX: '-50%',
								translateY: '-50%',
								transition: ANIMATION_CONFIG.exit,
							}}
							transition={ANIMATION_CONFIG.spring}
							className='fixed z-50'
							style={{
								left: 0,
								top: 0,
							}}
						>
							{renderedContent}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
};

// Export the memoized component
export const CursorTooltip = memo(CursorTooltipComponent);
CursorTooltip.displayName = 'CursorTooltip';

export default CursorTooltip;
