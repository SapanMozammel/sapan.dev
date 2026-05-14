import { ABOUT_DATA } from '@/data/content/about';
import { PORTFOLIO_PROJECTS } from '@/data/content/portfolio';
import { IconArrowUpRight } from '@tabler/icons-react';

const FEATURED_PROJECT_TITLES = ['TubeOnAI', 'Templately', 'xCloud', 'Betterdocs', 'NotificationX', 'Easy.Jobs'] as const;

const MAX_PROJECT_TECH_CHIPS = 3;

const featuredProjects = FEATURED_PROJECT_TITLES.map((title) => PORTFOLIO_PROJECTS.find((project) => project.title === title)).filter((project): project is (typeof PORTFOLIO_PROJECTS)[number] => Boolean(project));

const SkillsPanel = () => {
	return (
		<div className='font-dm flex flex-col gap-[1em] p-[1.25em]'>
			<section className='flex flex-col gap-[0.4em]'>
				<h3 className='text-secondary-500 dark:text-secondary-500 text-[0.75em] font-semibold tracking-widest uppercase'>Featured Projects</h3>
				<div className='grid grid-cols-2 gap-[0.65em]'>
					{featuredProjects.map((project) => (
						<a
							key={project.title}
							href={project.link}
							target='_blank'
							rel='noopener noreferrer'
							aria-label={`${project.title} (opens in new tab)`}
							className='border-info/30 hover:border-primary focus-visible:outline-primary group/project dark:hover:border-success dark:focus-visible:outline-success flex flex-col gap-[0.3em] rounded-[0.5em] border-[0.025em] border-solid bg-white/30 p-[0.7em] transition-colors focus-visible:outline-[0.1em] focus-visible:outline-offset-[0.15em] dark:bg-black/30'
						>
							<div className='flex items-center justify-between gap-[0.4em]'>
								<span className='text-[0.85em] leading-none font-bold'>{project.title}</span>
								<IconArrowUpRight
									aria-hidden='true'
									className='text-secondary-500 group-hover/project:text-primary dark:group-hover/project:text-success size-[1em] shrink-0 transition-colors rtl:-rotate-90'
								/>
							</div>
							<div className='flex flex-wrap gap-[0.25em]'>
								{project.technologies.slice(0, MAX_PROJECT_TECH_CHIPS).map((tech) => (
									<span
										key={tech}
										className='border-info/30 text-dark/80 rounded-[0.3em] border-[0.025em] border-solid bg-white/50 px-[0.45em] py-[0.15em] text-[0.7em] leading-none dark:bg-black/50 dark:text-white/80'
									>
										{tech}
									</span>
								))}
							</div>
						</a>
					))}
				</div>
			</section>
			{ABOUT_DATA.skillGroups.map((group) => (
				<section key={group.id} className='flex flex-col gap-[0.4em]'>
					<h3 className='text-secondary-500 dark:text-secondary-500 text-[0.75em] font-semibold tracking-widest uppercase'>{group.label}</h3>
					<div className='flex flex-wrap gap-[0.35em]'>
						{group.items.map((item) => (
							<span
								key={item}
								className='border-info/30 text-dark/80 rounded-[0.35em] border-[0.025em] border-solid bg-white/30 px-[0.65em] py-[0.3em] text-[0.8em] leading-none dark:bg-black/30 dark:text-white/80'
							>
								{item}
							</span>
						))}
					</div>
				</section>
			))}
			<section className='flex flex-col gap-[0.4em]'>
				<h3 className='text-secondary-500 dark:text-secondary-500 text-[0.75em] font-semibold tracking-widest uppercase'>Languages</h3>
				<div className='flex flex-wrap gap-[0.35em]'>
					{ABOUT_DATA.languages.map((lang) => (
						<span
							key={lang.id}
							className='border-info/30 text-dark/80 inline-flex items-baseline gap-[0.35em] rounded-[0.35em] border-[0.025em] border-solid bg-white/30 px-[0.65em] py-[0.3em] text-[0.8em] leading-none dark:bg-black/30 dark:text-white/80'
						>
							<span className='font-semibold'>{lang.name}</span>
							<span className='text-secondary-500 dark:text-secondary-500 text-[0.8em] tracking-wide uppercase'>{lang.level}</span>
						</span>
					))}
				</div>
			</section>
		</div>
	);
};

export default SkillsPanel;
