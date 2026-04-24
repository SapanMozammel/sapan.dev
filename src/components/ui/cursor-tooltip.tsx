'use client';

import { cn } from '@/lib/utils';
import type { CursorTooltipProps, Position, TooltipContentProps } from '@/types/cursor-tooltip';
import { AnimatePresence, motion, useSpring } from 'framer-motion';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const TooltipContent = memo<TooltipContentProps>(({ children, className }) => (
	<div className={cn('bg-primary/80 border-primary dark:border-success dark:bg-success/80 dark:text-dark pointer-events-none rounded-2xl border-1 border-solid px-3 py-2 text-sm text-white', className)}>{children}</div>
));
TooltipContent.displayName = 'TooltipContent';

const ANIMATION_CONFIG = {
	spring: {
		type: 'spring' as const,
		stiffness: 200,
		damping: 25,
		mass: 0.6,
	},
	exit: {
		duration: 0.2,
		ease: [0.4, 0.0, 1, 1] as const,
	},
} as const;

const calculateElementCenter = (element: Element): Position => {
	const rect = element.getBoundingClientRect();
	return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
};

const CursorTooltipComponent: React.FC<CursorTooltipProps> = ({ children, content, className, offset = { x: 0, y: 0 }, contentClassName, onClick }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [mounted, setMounted] = useState(false);
	const isVisibleRef = useRef(false);

	const x = useSpring(0, ANIMATION_CONFIG.spring);
	const y = useSpring(0, ANIMATION_CONFIG.spring);

	useEffect(() => {
		setMounted(true);
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
			const elementCenter = calculateElementCenter(e.currentTarget);
			const cursorPos = calculateCursorPosition(e.nativeEvent);

			x.jump(elementCenter.x);
			y.jump(elementCenter.y);
			x.set(cursorPos.x);
			y.set(cursorPos.y);
			setIsVisible(true);
			isVisibleRef.current = true;
		},
		[calculateCursorPosition, x, y]
	);

	const handleMouseLeave = useCallback(() => {
		setIsVisible(false);
		isVisibleRef.current = false;
	}, []);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isVisibleRef.current) {
				return;
			}

			const cursorPos = calculateCursorPosition(e.nativeEvent);
			x.set(cursorPos.x);
			y.set(cursorPos.y);
		},
		[calculateCursorPosition, x, y]
	);

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
			<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} onClick={onClick} className={cn('pointer-fine:cursor-none', className)}>
				{children}
			</div>
			{mounted &&
				createPortal(
					<AnimatePresence>
						{isVisible && (
							<motion.div
								initial={{ opacity: 1, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0, transition: ANIMATION_CONFIG.exit }}
								transition={ANIMATION_CONFIG.spring}
								className='pointer-events-none fixed z-50'
								style={{ left: 0, top: 0, x, y, translateX: '-50%', translateY: '-50%' }}
							>
								{renderedContent}
							</motion.div>
						)}
					</AnimatePresence>,
					document.body
				)}
		</>
	);
};

const CursorTooltip = memo(CursorTooltipComponent);
CursorTooltip.displayName = 'CursorTooltip';

export default CursorTooltip;
