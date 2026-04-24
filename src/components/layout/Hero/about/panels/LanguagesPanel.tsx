import { ABOUT_DATA } from '@/data/content/about';
import { getTranslations } from 'next-intl/server';

const LanguagesPanel = async () => {
	const translate = await getTranslations('home.hero.about');

	return (
		<div className='flex flex-col gap-[0.65em] p-[1.25em]'>
			{ABOUT_DATA.languages.map((lang) => (
				<div key={lang.id} className='border-info/30 flex items-center justify-between gap-[0.5em] rounded-[0.5em] border-[0.025em] border-solid bg-white/30 px-[0.85em] py-[0.75em] dark:bg-black/30'>
					<div className='text-[0.85em] font-bold'>{lang.name}</div>
					<div className='text-info text-[0.7em] font-semibold tracking-wide uppercase'>{translate(`languages.levels.${lang.level}`)}</div>
				</div>
			))}
		</div>
	);
};

export default LanguagesPanel;
