import { cn } from '@/lib/utils';

type StatusMessageProps = {
	icon: React.ReactNode;
	iconBg: string;
	title: string;
	description: string;
	children?: React.ReactNode;
};

const StatusMessage = ({ icon, iconBg, title, description, children }: StatusMessageProps) => (
	<div className='flex flex-col items-center gap-3 py-6 text-center'>
		<div className={cn('flex h-14 w-14 items-center justify-center rounded-xl', iconBg)}>{icon}</div>
		<h3 className='text-heading-medium-alt text-dark tracking-wide dark:text-white'>{title}</h3>
		<p className='text-paragraph-small text-secondary-600 dark:text-secondary-400 tracking-wide'>{description}</p>
		{children}
	</div>
);

export default StatusMessage;
