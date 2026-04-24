import { EDUCATION_DATA } from '@/data/content/education';

const formatYear = (value: string): string => {
	const [yearStr] = value.split('-');
	return yearStr ?? value;
};

const EducationPanel = () => {
	return (
		<div className='flex flex-col gap-[0.65em] p-[1.25em]'>
			{EDUCATION_DATA.map((item) => (
				<div key={item.id} className='border-info/30 flex flex-col gap-[0.25em] rounded-[0.5em] border-[0.025em] border-solid bg-white/30 p-[0.85em] dark:bg-black/30'>
					<div className='flex items-baseline justify-between gap-[0.5em]'>
						<div className='text-[0.85em] leading-tight font-bold'>{item.degree}</div>
						<div className='text-secondary-500 dark:text-secondary-500 shrink-0 text-[0.6em] tracking-wide whitespace-nowrap'>
							{formatYear(item.startDate)} — {formatYear(item.endDate)}
						</div>
					</div>
					<div className='text-info text-[0.7em] font-semibold'>{item.institution}</div>
					<div className='text-secondary-500 dark:text-secondary-500 text-[0.6em] tracking-wide'>
						{item.location}
						{item.meta ? ` · ${item.meta}` : ''}
					</div>
				</div>
			))}
		</div>
	);
};

export default EducationPanel;
