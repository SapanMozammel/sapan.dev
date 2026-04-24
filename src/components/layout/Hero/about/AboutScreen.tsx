import type { AboutTab } from '@/types/about';
import { IconBriefcase, IconLanguage, IconSchool, IconSparkles, IconUser } from '@tabler/icons-react';
import { getTranslations } from 'next-intl/server';

import AboutDecorations from './AboutDecorations';
import AboutTabs from './AboutTabs';
import AboutPanel from './panels/AboutPanel';
import EducationPanel from './panels/EducationPanel';
import ExperiencePanel from './panels/ExperiencePanel';
import LanguagesPanel from './panels/LanguagesPanel';
import SkillsPanel from './panels/SkillsPanel';

const ICON_CLASS = 'h-[1.1em] w-[1.1em]';

const AboutScreen = async () => {
	const translate = await getTranslations('home.hero.about');

	const tabs: AboutTab[] = [
		{ id: 'about', label: translate('tabs.about'), icon: <IconUser className={ICON_CLASS} />, content: <AboutPanel /> },
		{ id: 'experience', label: translate('tabs.experience'), icon: <IconBriefcase className={ICON_CLASS} />, content: <ExperiencePanel /> },
		{ id: 'education', label: translate('tabs.education'), icon: <IconSchool className={ICON_CLASS} />, content: <EducationPanel /> },
		{ id: 'skills', label: translate('tabs.skills'), icon: <IconSparkles className={ICON_CLASS} />, content: <SkillsPanel /> },
		{ id: 'languages', label: translate('tabs.languages'), icon: <IconLanguage className={ICON_CLASS} />, content: <LanguagesPanel /> },
	];

	return (
		<div className='group/about-screen font-dm text-dark relative aspect-[16/10] w-full text-start text-[0.75vw] !font-normal dark:text-white'>
			<div className='bg-light/20 border-info/30 shadow-info/10 pointer-events-none flex h-full w-full rounded-[0.6em] border-[0.025em] border-solid shadow-lg backdrop-blur transition-transform delay-500 duration-1000 ease-in-out select-none group-hover/about-screen:scale-105 dark:bg-slate-900/20'>
				<div className='pointer-events-auto flex h-full w-full'>
					<AboutTabs tabs={tabs} profileName='Sapan Mozammel' />
				</div>
			</div>
			<AboutDecorations />
		</div>
	);
};

export default AboutScreen;
