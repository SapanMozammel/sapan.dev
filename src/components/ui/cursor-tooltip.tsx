'use client';

import { cn } from '@/lib/utils';
import type { CursorTooltipProps, Position, TooltipContentProps } from '@/types/cursor-tooltip';
import { AnimatePresence, motion } from 'framer-motion';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const TooltipContent = memo<TooltipContentProps>(({ children, className }) => (
	<div className={cn('bg-primary/80 border-primary dark:border-success dark:bg-success/80 dark:text-dark pointer-events-none rounded-2xl border-1 border-solid px-3 py-2 text-sm font-medium text-white', className)}>
		{children}
	</div>
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
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
	const [initialPosition, setInitialPosition] = useState<Position>({ x: 0, y: 0 });
	const [mounted, setMounted] = useState(false);
	const isVisibleRef = useRef(false);
	const rafRef = useRef<number>(0);

	useEffect(() => {
		setMounted(true);
		return () => {
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
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
			const elementCenter = calculateElementCenter(e.currentTarget);
			const cursorPos = calculateCursorPosition(e.nativeEvent);

			setInitialPosition(elementCenter);
			setPosition(cursorPos);
			setIsVisible(true);
			isVisibleRef.current = true;
		},
		[calculateCursorPosition]
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

			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
			rafRef.current = requestAnimationFrame(() => {
				setPosition(cursorPos);
			});
		},
		[calculateCursorPosition]
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
			<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} onClick={onClick} className={cn('cursor-none', className)}>
				{children}
			</div>
			{mounted &&
				createPortal(
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
								className='pointer-events-none fixed z-50'
								style={{ left: 0, top: 0 }}
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

export const CursorTooltip = memo(CursorTooltipComponent);
CursorTooltip.displayName = 'CursorTooltip';

export default CursorTooltip;
