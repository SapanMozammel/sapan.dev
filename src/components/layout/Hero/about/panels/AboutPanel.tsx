import { ABOUT_DATA } from '@/data/content/about';
import { getYearsOfExperience } from '@/lib/utils/experience';
import { getTranslations } from 'next-intl/server';

const AboutPanel = async () => {
	const translate = await getTranslations('home.hero.about');
	const years = getYearsOfExperience();

	const quickFacts = [{ id: 'experience', label: translate('quickFacts.experience'), value: `${years}+ years` }, ...ABOUT_DATA.quickFacts];

	return (
		<div className='flex h-full flex-col gap-[1em] p-[1.25em]'>
			<div className='border-info/30 inline-flex w-fit items-center gap-[0.5em] rounded-[2em] border-[0.025em] border-solid bg-white/40 px-[0.9em] py-[0.4em] text-[0.75em] font-semibold tracking-wide uppercase dark:bg-black/40'>
				<span className='bg-success aspect-square h-[0.55em] rounded-full' />
				<span>{translate('availability.pill')}</span>
			</div>
			<p className='text-dark/80 text-[0.85em] leading-[1.6] dark:text-white/80'>{ABOUT_DATA.bio}</p>
			<div className='mt-auto grid grid-cols-2 gap-[0.5em]'>
				{quickFacts.map((fact) => (
					<div key={fact.id} className='border-info/30 flex flex-col gap-[0.2em] rounded-[0.5em] border-[0.025em] border-solid bg-white/30 p-[0.75em] dark:bg-black/30'>
						<div className='text-secondary-500 dark:text-secondary-500 text-[0.55em] tracking-widest uppercase'>{fact.label}</div>
						<div className='text-[0.8em] leading-none font-semibold'>{fact.value}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AboutPanel;
