import DownloadResumeButton from '@/components/layout/common/DownloadResumeButton';
import SectionSeparator from '@/components/layout/common/SectionSeparator';
import TextUnderline from '@/components/layout/common/TextUnderline';
import AdminScreen from '@/components/layout/Hero/AdminScreen';
import HeroBackground from '@/components/layout/Hero/HeroBackground';
import { getTranslations } from 'next-intl/server';

const Hero = async () => {
	const translate = await getTranslations('home.hero');

	return (
		<section id='home' className='flex flex-col pt-14 sm:pt-20'>
			<div className='relative z-2 flex grow flex-col'>
				<HeroBackground>
					<SectionSeparator lts rts lbs rbs bl ll rl>
						<div className='container flex w-full grow flex-col items-center justify-center gap-4 pt-16 text-center sm:pt-24 lg:pt-32'>
							<h1 className='sr-only'>{translate('srTitle')}</h1>
							<h2 className='text-heading-xlarge dark:via-light inline-block bg-radial from-slate-400 via-slate-900 via-45% to-slate-600 to-75% bg-clip-text text-transparent dark:from-slate-600 dark:to-slate-400'>
								{translate('headingPrefix')} <TextUnderline className='text-dark dark:text-white'>JavaScript</TextUnderline>
								{translate('headingSuffix')}
							</h2>
							<p className='text-secondary-600 dark:text-secondary-400 text-paragraph-medium inline-flex max-w-[90ch] tracking-wider'>{translate('description')}</p>
							<DownloadResumeButton className='mt-0 sm:mt-4' />
							<div className='mt-4 -mb-[20vw] w-3/4 sm:mt-10 lg:mt-14'>
								<AdminScreen />
							</div>
						</div>
					</SectionSeparator>
				</HeroBackground>
			</div>
		</section>
	);
};

export default Hero;
