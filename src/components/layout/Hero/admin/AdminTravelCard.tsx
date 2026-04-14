import Cloud from '@/components/icons/Cloud';

const AdminTravelCard = () => {
	return (
		<div className='border-info/20 bg-light/10 pointer-events-none absolute -top-[4em] -right-[4em] flex w-[22em] flex-col items-start rounded-[2.25em] border-[0.05em] border-solid p-[1.5em] backdrop-blur transition-transform delay-500 duration-1000 ease-in-out select-none group-hover/admin-dashboard:-translate-x-[1em] group-hover/admin-dashboard:scale-105 dark:bg-slate-900/10'>
			<div className='border-info/30 flex w-full items-center justify-center rounded-[1em] border-[0.05em] border-solid bg-white/30 p-[1em] backdrop:blur-md dark:bg-black/30'>
				<Cloud className='w-[9em]' />
			</div>
			<div className='mt-[0.9em] text-[1.4em] leading-snug'>Designing a Travel App</div>
			<div className='text-secondary-600 dark:text-secondary-400 mt-[0.8em] text-[0.9em] leading-snug font-normal'>
				Embark on a creative journey as you learn how to design a captivating travel app from concept to user-centric experience. This comprehensive course in Figma will immerse you in the world of travel app
				design, covering everything from user interface aesthetics to intuitive user experiences (UX).
			</div>
			<div className='bg-info/30 mt-[1.3em] inline-flex h-[2.5em] items-center justify-center rounded-[0.4em] px-[1.5em] text-[1em] font-bold uppercase'>Accept</div>
		</div>
	);
};

export default AdminTravelCard;
