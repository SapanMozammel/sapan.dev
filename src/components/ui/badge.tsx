import { cn } from '@/lib/utils';
import type { BadgeProps } from '@/types/badge';

const Badge = ({ children, className }: BadgeProps) => (
	<span className={cn('font-hg bg-secondary-100 text-secondary-500 dark:bg-secondary-800 dark:text-secondary-500 rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase', className)}>{children}</span>
);

export default Badge;
