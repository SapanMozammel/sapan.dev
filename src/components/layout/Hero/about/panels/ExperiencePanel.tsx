import { EXPERIENCE_DATA } from '@/data/content/experience';

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

const formatYearMonth = (value?: string): string => {
	if (!value) return '';
	const [yearStr, monthStr] = value.split('-');
	if (!yearStr) return value;
	const monthIdx = monthStr ? parseInt(monthStr, 10) - 1 : -1;
	if (monthIdx >= 0 && monthIdx < 12) {
		return `${MONTH_SHORT[monthIdx]} ${yearStr}`;
	}
	return yearStr;
};

const ExperiencePanel = () => {
	return (
		<div className='flex flex-col gap-[0.65em] p-[1.25em]'>
			{EXPERIENCE_DATA.map((item) => {
				const dateRange = `${formatYearMonth(item.startDate)} — ${item.endDate ? formatYearMonth(item.endDate) : 'Present'}`;
				return (
					<div key={item.id} className='border-info/30 flex flex-col gap-[0.25em] rounded-[0.5em] border-[0.025em] border-solid bg-white/30 p-[0.85em] dark:bg-black/30'>
						<div className='flex items-baseline justify-between gap-[0.5em]'>
							<div className='text-[0.85em] leading-tight font-bold'>{item.position}</div>
							<div className='text-secondary-500 dark:text-secondary-500 shrink-0 text-[0.6em] tracking-wide whitespace-nowrap'>{dateRange}</div>
						</div>
						<div className='text-info text-[0.7em] font-semibold'>{item.company}</div>
						<div className='text-secondary-500 dark:text-secondary-500 text-[0.6em] tracking-wide'>
							{item.location} · {item.type}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ExperiencePanel;
