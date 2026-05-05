import { cn } from '@/lib/utils';

type StatusDotProps = {
	pulse?: boolean | undefined;
	className?: string;
};

const StatusDot = ({ pulse = true, className }: StatusDotProps) => (
	<span className={cn('relative flex h-2.5 w-2.5 shrink-0', className)}>
		{pulse && <span className='bg-primary dark:bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75' />}
		<span className='bg-primary dark:bg-success relative inline-flex h-2.5 w-2.5 rounded-full' />
	</span>
);

export default StatusDot;
