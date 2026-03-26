import Timeline from '@/components/ui/timeline';
import { EXPERIENCE_DATA } from '@/data/content/experience';
import SectionSeparator from '../common/SectionSeparator';
import SectionTitle from '../common/SectionTitle';
import ParticleBackground from './ParticleBackground';

const Experience = () => (
	<section className='relative z-1 pb-8 sm:pb-12 lg:pb-16'>
		<ParticleBackground />
		<SectionSeparator lts rts lbs rbs tl bl ll rl>
			<div className='container flex w-full grow flex-col items-center justify-start gap-4 pb-8 sm:pb-12 lg:pb-16'>
				<SectionTitle subtitle='Experience' title={`Evolution as a Developer`} watermark='Experience' />
				<Timeline items={EXPERIENCE_DATA} />
			</div>
		</SectionSeparator>
	</section>
);

export default Experience;
