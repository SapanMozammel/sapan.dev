import { cn } from '@/lib/utils';

type MetaLabelProps = {
	icon?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
};

const MetaLabel = ({ icon, children, className }: MetaLabelProps) => (
	<span className={cn('text-secondary-400 dark:text-secondary-600 flex items-center gap-1.5 text-xs', className)}>
		{icon}
		<span className='font-hg font-medium'>{children}</span>
	</span>
);

export default MetaLabel;
