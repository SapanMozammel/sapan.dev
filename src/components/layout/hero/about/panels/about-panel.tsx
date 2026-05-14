import { ABOUT_DATA } from '@/data/content/about';
import { getYearsOfExperience } from '@/lib/utils/experience';
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconWorld } from '@tabler/icons-react';

const SOCIAL_ICONS = {
	email: IconMail,
	linkedin: IconBrandLinkedin,
	github: IconBrandGithub,
	portfolio: IconWorld,
} as const;

const AboutPanel = () => {
	const years = getYearsOfExperience();

	const [firstFact, ...restFacts] = ABOUT_DATA.quickFacts;
	const quickFacts = [firstFact, { id: 'experience', label: 'Experience', value: `${years}+ years` }, ...restFacts];

	return (
		<div className='font-dm flex h-full flex-col gap-[1em] p-[1.25em]'>
			<div className='border-info/30 inline-flex w-fit items-center gap-[0.5em] rounded-[2em] border-[0.025em] border-solid bg-white/50 px-[0.9em] py-[0.4em] text-[0.75em] font-semibold tracking-wide uppercase dark:bg-black/50'>
				<span aria-hidden='true' className='bg-primary dark:bg-success aspect-square h-[0.55em] rounded-full' />
				<span>Open to remote · 30-day notice</span>
			</div>
			<p className='text-dark/80 text-[0.85em] leading-[1.6] dark:text-white/80'>{ABOUT_DATA.bio}</p>
			<section className='flex flex-col gap-[0.4em]'>
				<h3 className='text-secondary-500 dark:text-secondary-500 text-[0.75em] font-semibold tracking-widest uppercase'>Works across</h3>
				<div className='flex flex-wrap gap-[0.35em]'>
					{ABOUT_DATA.industries.map((industry) => (
						<span
							key={industry}
							className='border-info/30 text-dark/80 rounded-[0.35em] border-[0.025em] border-solid bg-white/30 px-[0.65em] py-[0.3em] text-[0.8em] leading-none dark:bg-black/30 dark:text-white/80'
						>
							{industry}
						</span>
					))}
				</div>
			</section>
			<section className='flex flex-col gap-[0.4em]'>
				<h3 className='text-secondary-500 dark:text-secondary-500 text-[0.75em] font-semibold tracking-widest uppercase'>Strengths</h3>
				<div className='flex flex-wrap gap-[0.35em]'>
					{ABOUT_DATA.strengths.map((strength) => (
						<span
							key={strength}
							className='border-info/30 text-dark/80 rounded-[0.35em] border-[0.025em] border-solid bg-white/30 px-[0.65em] py-[0.3em] text-[0.8em] leading-none dark:bg-black/30 dark:text-white/80'
						>
							{strength}
						</span>
					))}
				</div>
			</section>
			<div className='flex items-center gap-[0.6em]'>
				{ABOUT_DATA.socials.map((social) => {
					const Icon = SOCIAL_ICONS[social.id];
					return (
						<a
							key={social.id}
							href={social.href}
							target='_blank'
							rel='noopener noreferrer'
							aria-label={`${social.label} (opens in new tab)`}
							className='border-info/30 text-dark/80 hover:text-primary focus-visible:outline-primary dark:hover:text-success dark:focus-visible:outline-success flex aspect-square h-[2.5em] items-center justify-center rounded-[0.4em] border-[0.025em] border-solid bg-white/30 transition-colors focus-visible:outline-[0.1em] focus-visible:outline-offset-[0.15em] dark:bg-black/30 dark:text-white/80'
						>
							<Icon aria-hidden='true' className='size-[1.2em]' />
							<span className='sr-only'>{social.label}</span>
						</a>
					);
				})}
			</div>
			<div className='mt-auto flex flex-col gap-[0.5em]'>
				<div className='grid grid-cols-2 gap-[0.5em]'>
					{quickFacts.map((fact) => (
						<div key={fact.id} className='border-info/30 flex flex-col gap-[0.2em] rounded-[0.5em] border-[0.025em] border-solid bg-white/30 p-[0.75em] dark:bg-black/30'>
							<div className='text-secondary-500 dark:text-secondary-500 text-[0.7em] tracking-widest uppercase'>{fact.label}</div>
							<div className='text-[0.85em] leading-none font-semibold'>{fact.value}</div>
						</div>
					))}
				</div>
				<div className='text-secondary-500 dark:text-secondary-500 text-[0.7em] tracking-wide italic'>Same stack as the Skills tab →</div>
			</div>
		</div>
	);
};

export default AboutPanel;
