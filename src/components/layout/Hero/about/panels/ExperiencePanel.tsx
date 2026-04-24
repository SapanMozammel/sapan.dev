import { EXPERIENCE_DATA } from '@/data/content/experience';
import { getRoleDuration } from '@/lib/utils/experience';
import { IconRosetteDiscountCheckFilled } from '@tabler/icons-react';

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

const MAX_TECH_CHIPS = 4;

const ExperiencePanel = () => {
	return (
		<div className='font-dm flex flex-col gap-[0.65em] p-[1.25em]'>
			{EXPERIENCE_DATA.map((item) => {
				const dateRange = `${formatYearMonth(item.startDate)} — ${item.endDate ? formatYearMonth(item.endDate) : 'Present'}`;
				const duration = getRoleDuration(item.startDate, item.endDate);
				const isCurrent = !item.endDate && !!item.startDate;
				const highlight = item.achievements?.[0];
				const topTech = item.technologies?.slice(0, MAX_TECH_CHIPS) ?? [];
				const extraTechCount = (item.technologies?.length ?? 0) - topTech.length;
				return (
					<article key={item.id} className='border-info/30 flex flex-col gap-[0.5em] rounded-[0.5em] border-[0.025em] border-solid bg-white/30 p-[0.85em] dark:bg-black/30'>
						<div className='flex items-baseline justify-between gap-[0.5em]'>
							<div className='flex items-baseline gap-[0.5em]'>
								<h3 className='text-[0.85em] leading-tight font-bold'>{item.position}</h3>
								{duration && (
									<span className='border-info/30 text-secondary-500 dark:text-secondary-500 rounded-[0.3em] border-[0.025em] border-solid px-[0.5em] py-[0.15em] text-[0.7em] tracking-wide uppercase'>
										{duration}
									</span>
								)}
							</div>
							<div className='text-secondary-500 dark:text-secondary-500 shrink-0 text-[0.75em] tracking-wide whitespace-nowrap'>{dateRange}</div>
						</div>
						<div className='flex items-center gap-[0.4em]'>
							{isCurrent && (
								<>
									<span aria-hidden='true' className='bg-primary dark:bg-success aspect-square h-[0.4em] rounded-full motion-safe:animate-pulse' />
									<span className='sr-only'>Current role.</span>
								</>
							)}
							<div className='text-primary dark:text-success text-[0.8em] font-semibold'>{item.company}</div>
						</div>
						<div className='text-secondary-500 dark:text-secondary-500 text-[0.75em] tracking-wide'>
							{item.location} · {item.type}
						</div>
						{highlight ? (
							<div className='text-dark/80 flex items-start gap-[0.4em] text-[0.8em] leading-[1.5] dark:text-white/80'>
								<IconRosetteDiscountCheckFilled aria-hidden='true' className='text-primary dark:text-success mt-[0.15em] size-[1em] shrink-0' />
								<span className='line-clamp-2'>{highlight}</span>
							</div>
						) : null}
						{topTech.length ? (
							<div className='flex flex-wrap gap-[0.3em]'>
								{topTech.map((tech) => (
									<span
										key={tech}
										className='border-info/30 text-dark/80 rounded-[0.3em] border-[0.025em] border-solid bg-white/50 px-[0.55em] py-[0.2em] text-[0.75em] leading-none dark:bg-black/50 dark:text-white/80'
									>
										{tech}
									</span>
								))}
								{extraTechCount > 0 && <span className='text-secondary-500 dark:text-secondary-500 px-[0.35em] py-[0.2em] text-[0.75em] leading-none'>+{extraTechCount} more</span>}
							</div>
						) : null}
					</article>
				);
			})}
		</div>
	);
};

export default ExperiencePanel;
