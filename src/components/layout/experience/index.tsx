import SectionSeparator from '@/components/layout/common/section-separator';
import SectionTitle from '@/components/layout/common/section-title';
import Timeline from '@/components/ui/timeline';
import { EXPERIENCE_DATA } from '@/data/content/experience';
import { getTranslations } from 'next-intl/server';
import ParticleBackground from './particle-background';

const Experience = async () => {
	const translate = await getTranslations('home.experience');

	return (
		<section id='experience' className='relative z-1 pb-16 sm:pb-24 lg:pb-32'>
			<ParticleBackground />
			<SectionSeparator lts rts lbs rbs tl bl ll rl>
				<div className='container flex w-full grow flex-col items-center justify-start gap-4'>
					<SectionTitle subtitle={translate('subtitle')} title={translate('title')} watermark='Experience' />
					<Timeline items={EXPERIENCE_DATA} />
				</div>
			</SectionSeparator>
		</section>
	);
};

export default Experience;
