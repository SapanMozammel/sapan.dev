import { IconArchive, IconArchiveOff, IconArrowBackUp, IconDots, IconRotate2, IconRotateClockwise, IconToggleLeft, IconTrash } from '@tabler/icons-react';

import { inboxList } from './data';

const AdminEmailPreview = () => {
	return (
		<div className='border-info/30 flex w-5/12 shrink-0 flex-col border-e-[0.025em] border-solid'>
			<div className='border-info/30 flex h-[3.5em] items-center border-b-[0.025em] border-solid p-[1em]'>
				<div className='flex items-center gap-[1em]'>
					<IconArchive className='h-[0.9em] w-[0.9em]' />
					<IconArchiveOff className='h-[0.9em] w-[0.9em]' />
					<IconTrash className='h-[0.9em] w-[0.9em]' />
				</div>
				<div className='ms-auto flex items-center gap-[1em]'>
					<IconRotate2 className='text-secondary-400 dark:text-secondary-400 h-[1.1em] w-[1.1em]' />
					<IconArrowBackUp className='text-secondary-400 dark:text-secondary-400 h-[1.1em] w-[1.1em]' />
					<IconRotateClockwise className='text-secondary-400 dark:text-secondary-400 h-[1.1em] w-[1.1em]' />
					<IconDots className='text-secondary-400 dark:text-secondary-400 h-[1.1em] w-[1.1em]' />
				</div>
			</div>
			<div className='border-info/30 flex gap-[1em] border-b-[0.025em] border-solid p-[1em]'>
				<div className='bg-info/30 inline-flex aspect-square h-[3em] items-center justify-center rounded-full'>WS</div>
				<div className='flex w-full flex-col gap-[0.35em]'>
					<div className='inline-flex items-center gap-[0.5em] text-[1em] leading-snug font-bold'>
						<div>{inboxList[0].name}</div>
						<div className='text-secondary-500 dark:text-secondary-400 ms-auto text-[0.7em]'>{inboxList[0].time}</div>
					</div>
					<div className='text-secondary-500 dark:text-secondary-400 text-[0.7em] leading-none'>{inboxList[0].title}</div>
					<div className='text-secondary-500 dark:text-secondary-400 text-[0.7em] leading-none'>Reply-To: {inboxList[0].email}</div>
				</div>
			</div>
			<div className='border-info/30 grow border-b-[0.025em] border-solid p-[1em]'>
				<div
					className='text-secondary-600 dark:text-secondary-300 text-[0.65em] leading-relaxed'
					dangerouslySetInnerHTML={{
						__html: inboxList[0].message,
					}}
				/>
			</div>
			<div className='flex flex-col gap-[0.75em] p-[1em]'>
				<div className='border-info/30 text-secondary-600 dark:text-secondary-300 h-[6em] w-full rounded-[0.4em] border-[0.025em] border-solid p-[1em] text-[0.8em] leading-none'>Reply William Smith...</div>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-[0.5em] text-[0.8em]'>
						<IconToggleLeft className='text-secondary-300 dark:text-secondary-600 h-[2em] w-[2em]' />
						<div className='text-secondary-500 dark:text-secondary-400'>Mute the thread</div>
					</div>
					<div className='bg-info/30 inline-flex h-[2.5em] items-center justify-center rounded-[0.4em] px-[1.25em] text-[0.8em] font-bold uppercase'>Send</div>
				</div>
			</div>
		</div>
	);
};

export default AdminEmailPreview;
