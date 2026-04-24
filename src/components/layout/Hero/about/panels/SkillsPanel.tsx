import { ABOUT_DATA } from '@/data/content/about';

const SkillsPanel = () => {
	return (
		<div className='flex flex-col gap-[0.75em] p-[1.25em]'>
			{ABOUT_DATA.skillGroups.map((group) => (
				<div key={group.id} className='flex flex-col gap-[0.4em]'>
					<div className='text-secondary-500 dark:text-secondary-500 text-[0.6em] font-semibold tracking-widest uppercase'>{group.label}</div>
					<div className='flex flex-wrap gap-[0.35em]'>
						{group.items.map((item) => (
							<span
								key={item}
								className='border-info/30 text-dark/80 rounded-[0.35em] border-[0.025em] border-solid bg-white/30 px-[0.65em] py-[0.3em] text-[0.7em] leading-none dark:bg-black/30 dark:text-white/80'
							>
								{item}
							</span>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default SkillsPanel;
