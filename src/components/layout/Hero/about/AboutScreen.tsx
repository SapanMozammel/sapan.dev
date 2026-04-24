import type { AboutTab } from '@/types/about';
import { IconBriefcase, IconSchool, IconSparkles, IconUser } from '@tabler/icons-react';

import AboutDecorations from './AboutDecorations';
import AboutTabs from './AboutTabs';
import AboutPanel from './panels/AboutPanel';
import EducationPanel from './panels/EducationPanel';
import ExperiencePanel from './panels/ExperiencePanel';
import SkillsPanel from './panels/SkillsPanel';

const ICON_CLASS = 'h-[1.1em] w-[1.1em]';

const AboutScreen = () => {
	const tabs: AboutTab[] = [
		{ id: 'about', label: 'About', icon: <IconUser aria-hidden='true' className={ICON_CLASS} />, content: <AboutPanel /> },
		{ id: 'experience', label: 'Experience', icon: <IconBriefcase aria-hidden='true' className={ICON_CLASS} />, content: <ExperiencePanel /> },
		{ id: 'education', label: 'Education', icon: <IconSchool aria-hidden='true' className={ICON_CLASS} />, content: <EducationPanel /> },
		{ id: 'skills', label: 'Skills', icon: <IconSparkles aria-hidden='true' className={ICON_CLASS} />, content: <SkillsPanel /> },
	];

	return (
		<div className='group/about-screen font-dm text-dark relative aspect-[16/10] w-full text-start text-[0.75vw] !font-normal dark:text-white'>
			<div className='bg-light/20 border-info/30 shadow-info/10 pointer-events-none flex h-full w-full rounded-[0.6em] border-[0.025em] border-solid shadow-lg backdrop-blur select-none dark:bg-slate-900/20'>
				<div className='pointer-events-auto flex h-full w-full'>
					<AboutTabs tabs={tabs} profileName='Sapan Mozammel' />
				</div>
			</div>
			<AboutDecorations />
		</div>
	);
};

export default AboutScreen;
