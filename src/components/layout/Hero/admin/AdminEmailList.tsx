import { IconAdjustments, IconFilter } from '@tabler/icons-react';

import { inboxList } from './data';

const AdminEmailList = () => {
	return (
		<div className='border-info/30 w-7/12 shrink-0 border-e-[0.025em] border-solid'>
			<div className='border-info/30 flex h-[3.5em] items-center border-b-[0.025em] border-solid p-[1em]'>
				<div className='text-[1.1em] font-semibold'>Inbox</div>
				<div className='ms-auto flex items-center gap-[1em]'>
					<IconFilter className='text-secondary-500 dark:text-secondary-500 h-[1.05em] w-[1.05em]' />
					<IconAdjustments className='text-secondary-500 dark:text-secondary-500 h-[0.9em] w-[0.9em]' />
				</div>
			</div>
			<div className='flex flex-col gap-[0.5em] p-[1em]'>
				{inboxList.map((inbox, index) => {
					const isSelected = index === 0;
					const inboxClasses = `flex flex-col gap-[0.5em] rounded-[0.5em] border-[0.025em] border-solid p-[1em] ${isSelected ? 'bg-info/30 border-transparent' : 'border-info/30'}`;
					const nameClasses = `inline-flex items-center gap-[0.5em] text-[1em] leading-none font-bold ${
						inbox.status === 'unread' ? 'after:bg-primary after:aspect-square after:h-[0.6em] after:rounded-full' : ''
					}`;

					return (
						<div key={`${inbox.name}-${inbox.email}`} className={inboxClasses}>
							<div className='flex items-start gap-[1em]'>
								<div className='flex flex-col gap-[0.35em]'>
									<div className={nameClasses}>{inbox.name}</div>
									<div className='text-[0.8em] leading-none'>{inbox.title}</div>
								</div>
								<div className='text-secondary-500 dark:text-secondary-500 ms-auto text-[0.6em]'>{inbox.time}</div>
							</div>
							<div className='text-secondary-500 dark:text-secondary-500 line-clamp-1 text-[0.7em]'>{inbox.message}</div>
							<div className='mt-[0.1em] flex flex-wrap gap-[0.5em]'>
								{inbox.tags.map((tag) => (
									<div
										key={`${inbox.name}-${tag}`}
										className='border-info/30 text-secondary-500 dark:text-secondary-500 rounded-[0.25em] border-[0.025em] border-solid px-[0.7em] py-[0.5em] text-[0.6em] leading-none'
									>
										{tag}
									</div>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AdminEmailList;
