'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/lib/utils';

const TooltipProvider = React.memo<React.ComponentProps<typeof TooltipPrimitive.Provider>>(({ delayDuration = 0, ...props }) => {
	return <TooltipPrimitive.Provider data-slot='tooltip-provider' delayDuration={delayDuration} {...props} />;
});

const Tooltip = React.memo<React.ComponentProps<typeof TooltipPrimitive.Root>>(({ ...props }) => {
	return (
		<TooltipProvider>
			<TooltipPrimitive.Root data-slot='tooltip' {...props} />
		</TooltipProvider>
	);
});

const TooltipTrigger = React.memo<React.ComponentProps<typeof TooltipPrimitive.Trigger>>(({ ...props }) => {
	return <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />;
});

const TooltipContent = React.memo<React.ComponentProps<typeof TooltipPrimitive.Content>>(({ className, sideOffset = 0, children, ...props }) => {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Content
				data-slot='tooltip-content'
				sideOffset={sideOffset}
				className={cn(
					'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-primary dark:bg-success z-15 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-white dark:text-black',
					className
				)}
				{...props}
			>
				{children}
				<TooltipPrimitive.Arrow className='bg-primary dark:bg-success fill-primary dark:fill-success z-15 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]' />
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Portal>
	);
});

TooltipProvider.displayName = 'TooltipProvider';
Tooltip.displayName = 'Tooltip';
TooltipTrigger.displayName = 'TooltipTrigger';
TooltipContent.displayName = 'TooltipContent';

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
