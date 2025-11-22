'use client';

import { cn } from '@/lib/utils';
import type { CursorTooltipProps, Position, TooltipContentProps } from '@/types/cursor-tooltip';
import { gsap } from 'gsap';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const TooltipContent = memo<TooltipContentProps>(({ children, className }) => (
	<div className={cn('bg-primary/80 border-primary dark:border-success dark:bg-success/80 pointer-events-none rounded-2xl border-1 border-solid px-3 py-2 text-sm font-medium text-white dark:text-black', className)}>
		{children}
	</div>
));
TooltipContent.displayName = 'TooltipContent';

const ANIMATION_CONFIG = {
	entrance: {
		duration: 0.5,
		ease: 'back.out(1.2)',
	},
	exit: {
		duration: 0.25,
		ease: 'power2.inOut',
	},
	follow: {
		duration: 0.3,
		ease: 'power1.out',
	},
} as const;

const calculateElementCenter = (element: Element): Position => {
	const rect = element.getBoundingClientRect();
	return {
		x: rect.left + rect.width / 2,
		y: rect.top + rect.height / 2,
	};
};

const CursorTooltipComponent: React.FC<CursorTooltipProps> = ({ children, content, className, offset = { x: 0, y: 0 }, contentClassName, onClick }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const entranceTweenRef = useRef<gsap.core.Tween | null>(null);
	const followTweenRef = useRef<gsap.core.Tween | null>(null);
	const [mounted, setMounted] = React.useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const calculateCursorPosition = useCallback(
		(e: MouseEvent): Position => {
			return {
				x: e.clientX + offset.x,
				y: e.clientY + offset.y,
			};
		},
		[offset.x, offset.y]
	);

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent) => {
			if (!tooltipRef.current) {
				return;
			}

			if (entranceTweenRef.current) {
				entranceTweenRef.current.kill();
			}
			if (followTweenRef.current) {
				followTweenRef.current.kill();
			}

			const elementCenter = calculateElementCenter(e.currentTarget);
			const cursorPos = calculateCursorPosition(e.nativeEvent);

			gsap.set(tooltipRef.current, {
				opacity: 1,
				scale: 0,
				x: elementCenter.x,
				y: elementCenter.y,
				xPercent: -50,
				yPercent: -50,
			});

			entranceTweenRef.current = gsap.to(tooltipRef.current, {
				opacity: 1,
				scale: 1,
				x: cursorPos.x,
				y: cursorPos.y,
				duration: ANIMATION_CONFIG.entrance.duration,
				ease: ANIMATION_CONFIG.entrance.ease,
				overwrite: 'auto',
			});
		},
		[calculateCursorPosition]
	);

	const handleMouseLeave = useCallback((e: React.MouseEvent) => {
		if (!tooltipRef.current) {
			return;
		}

		if (entranceTweenRef.current) {
			entranceTweenRef.current.kill();
		}
		if (followTweenRef.current) {
			followTweenRef.current.kill();
		}

		const elementCenter = calculateElementCenter(e.currentTarget);

		entranceTweenRef.current = gsap.to(tooltipRef.current, {
			opacity: 0,
			scale: 0,
			x: elementCenter.x,
			y: elementCenter.y,
			duration: ANIMATION_CONFIG.exit.duration,
			ease: ANIMATION_CONFIG.exit.ease,
			overwrite: 'auto',
		});
	}, []);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!tooltipRef.current) {
				return;
			}

			const cursorPos = calculateCursorPosition(e.nativeEvent);

			if (followTweenRef.current) {
				followTweenRef.current.kill();
			}

			followTweenRef.current = gsap.to(tooltipRef.current, {
				x: cursorPos.x,
				y: cursorPos.y,
				duration: ANIMATION_CONFIG.follow.duration,
				ease: ANIMATION_CONFIG.follow.ease,
				overwrite: 'auto',
			});
		},
		[calculateCursorPosition]
	);

	useEffect(() => {
		return () => {
			if (entranceTweenRef.current) {
				entranceTweenRef.current.kill();
				entranceTweenRef.current = null;
			}
			if (followTweenRef.current) {
				followTweenRef.current.kill();
				followTweenRef.current = null;
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
			<div ref={containerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} onClick={onClick} className={cn('cursor-none', className)}>
				{children}
			</div>
			{mounted &&
				createPortal(
					<div
						ref={tooltipRef}
						className='pointer-events-none fixed z-50'
						style={{
							left: 0,
							top: 0,
							opacity: 0,
						}}
					>
						{renderedContent}
					</div>,
					document.body
				)}
		</>
	);
};

export const CursorTooltip = memo(CursorTooltipComponent);
CursorTooltip.displayName = 'CursorTooltip';

export default CursorTooltip;
