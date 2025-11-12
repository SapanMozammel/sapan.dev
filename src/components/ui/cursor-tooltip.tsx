'use client';

import { cn } from '@/lib/utils';
import type { CursorTooltipProps, Position, TooltipContentProps } from '@/types/cursor-tooltip';
import { gsap } from 'gsap';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

// Default tooltip content component for consistent styling
export const TooltipContent = memo<TooltipContentProps>(({ children, className }) => (
	<div className={cn('bg-primary/80 border-primary dark:border-success dark:bg-success/80 pointer-events-none rounded-2xl border-1 border-solid px-3 py-2 text-sm font-medium text-white dark:text-black', className)}>
		{children}
	</div>
));
TooltipContent.displayName = 'TooltipContent';

const ANIMATION_CONFIG = {
	spring: {
		duration: 0.6,
		ease: 'back.out(1.7)',
	},
	exit: {
		duration: 0.2,
		ease: 'power2.inOut',
	},
} as const;

const CursorTooltipComponent: React.FC<CursorTooltipProps> = ({ children, content, className, offset = { x: 0, y: 0 }, contentClassName }) => {
	const [isVisible, setIsVisible] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<gsap.core.Timeline | null>(null);

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

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent) => {
			if (!isVisible) {
				if (animationRef.current) {
					animationRef.current.kill();
				}
				setIsVisible(true);
				const cursorPos = calculateCursorPosition(e.nativeEvent);
				animationRef.current = gsap.timeline();
				animationRef.current.to(tooltipRef.current, {
					opacity: 1,
					scale: 1,
					x: cursorPos.x,
					y: cursorPos.y,
					duration: ANIMATION_CONFIG.spring.duration,
					ease: ANIMATION_CONFIG.spring.ease,
				});
			}
		},
		[isVisible, calculateCursorPosition]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent) => {
			if (animationRef.current) {
				animationRef.current.kill();
			}
			const elementCenter = calculateElementCenter(e.currentTarget);
			animationRef.current = gsap.timeline();
			animationRef.current.to(tooltipRef.current, {
				opacity: 0,
				scale: 0,
				x: elementCenter.x,
				y: elementCenter.y,
				duration: ANIMATION_CONFIG.exit.duration,
				ease: ANIMATION_CONFIG.exit.ease,
				onComplete: () => {
					animationRef.current?.kill();
					setIsVisible(false);
				},
			});
		},
		[calculateElementCenter]
	);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isVisible) {
				return;
			}
			if (animationRef.current) {
				animationRef.current.kill();
			}
			const cursorPos = calculateCursorPosition(e.nativeEvent);
			animationRef.current = gsap.timeline();
			animationRef.current.to(tooltipRef.current, {
				opacity: 1,
				scale: 1,
				x: cursorPos.x,
				y: cursorPos.y,
				duration: ANIMATION_CONFIG.spring.duration,
				ease: ANIMATION_CONFIG.spring.ease,
			});
		},
		[isVisible]
	);

	useEffect(() => {
		if (containerRef.current && tooltipRef.current) {
			const elementCenter = calculateElementCenter(containerRef.current);
			gsap.set(tooltipRef.current, {
				opacity: 1,
				scale: 0,
				x: elementCenter.x,
				y: elementCenter.y,
				xPercent: -50,
				yPercent: -50,
			});
		}
	}, [containerRef, tooltipRef]);

	useEffect(() => {
		return () => {
			if (animationRef.current) {
				animationRef.current.kill();
				animationRef.current = null;
			}
		};
	}, []);

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

	return (
		<>
			<div ref={containerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} className={cn('cursor-none', className)}>
				{children}
				<div
					ref={tooltipRef}
					className='pointer-events-none fixed z-50'
					style={{
						left: 0,
						top: 0,
					}}
				>
					{renderedContent}
				</div>
			</div>
		</>
	);
};

// Export the memoized component
export const CursorTooltip = memo(CursorTooltipComponent);
CursorTooltip.displayName = 'CursorTooltip';

export default CursorTooltip;
