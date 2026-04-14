import { cn } from '@/lib/utils';
import { IconAlienFilled, IconChevronDown } from '@tabler/icons-react';

import { menuItems } from '@/data/content/admin-dashboard';

const AdminSidebar = () => {
	return (
		<div className='border-info/30 flex w-1/4 shrink-0 flex-col gap-[1em] border-e-[0.025em] border-solid bg-white/50 p-[1.25em] dark:bg-black/50'>
			<div className='border-info/30 flex items-center gap-[0.75em] rounded-[0.4em] border-[0.025em] border-solid py-[0.75em] ps-[1em] pe-[0.8em] uppercase'>
				<IconAlienFilled className='h-[1.5em] w-[1.5em]' />
				<div className='text-[0.9em]'>Patrick Dean</div>
				<IconChevronDown className='ms-auto h-[1em] w-[1em]' />
			</div>
			<div className='mt-[2em] flex grow flex-col gap-[1.25em]'>
				{menuItems.map((item, index) => {
					const isActive = index === 1;
					const isLast = index === menuItems.length - 1;
					const itemClasses = cn(
						'flex items-center gap-[0.5em] border-s-[0.25em] border-solid py-[0.75em] ps-[1em] pe-[0.6em] uppercase',
						isActive ? 'from-info/30 rtl:to-info/30 border-info/50 bg-gradient-to-r to-transparent rtl:from-transparent' : 'border-transparent bg-transparent',
						isLast && 'before:bg-info/20 relative mt-auto before:absolute before:-top-[1.25em] before:left-0 before:h-[0.05em] before:w-full'
					);

					return (
						<div key={item.title} className={itemClasses}>
							{item.icon}
							<div className='text-[0.8em]'>{item.title}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AdminSidebar;
