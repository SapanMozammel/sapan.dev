import { cn } from '@/lib/utils';
import { IconArrowRight } from '@tabler/icons-react';

type CTALinkProps = {
	children: React.ReactNode;
	className?: string;
};

const CTALink = ({ children, className }: CTALinkProps) => (
	<span
		className={cn(
			'text-primary dark:text-success decoration-none text-heading-xsmall inline-flex flex-row items-center gap-1 tracking-wider uppercase transition-all duration-150 ease-in hover:gap-2 rtl:flex-row-reverse',
			className
		)}
	>
		<span>{children}</span>
		<IconArrowRight stroke={3} className='mb-0.5 h-4 w-4 transition-transform duration-300' />
	</span>
);

export default CTALink;
