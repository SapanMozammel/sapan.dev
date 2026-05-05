import { cn } from '@/lib/utils';

type BulletListProps = {
	items: string[];
	className?: string;
};

const BulletList = ({ items, className }: BulletListProps) => (
	<ul className={cn('text-secondary-600 dark:text-secondary-400 text-paragraph-small flex list-none flex-col gap-1.5', className)}>
		{items.map((item, idx) => (
			<li key={idx} className='relative flex items-start pl-4'>
				<span className='border-primary dark:border-success absolute left-0 mt-2 h-1.5 w-1.5 rounded-full border bg-transparent' />
				{item}
			</li>
		))}
	</ul>
);

export default BulletList;
