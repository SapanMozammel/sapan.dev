import Timeline from '@/components/ui/timeline';
import { EXPERIENCE_DATA } from '@/lib/constants/experience';
import { memo } from 'react';
import SectionSeparator from '../common/SectionSeparator';
import SectionTitle from '../common/SectionTitle';

const Experience = memo(() => {
	return (
		<section className='relative z-1 pb-8 sm:pb-12 lg:pb-16'>
			<SectionSeparator lts rts lbs rbs tl bl ll rl>
				<div className='container flex w-full grow flex-col items-center justify-start gap-4 pb-8 sm:pb-12 lg:pb-16'>
					<SectionTitle subtitle='Experience' title={`Evolution as a Developer`} watermark='Experience' />
					<Timeline items={EXPERIENCE_DATA} />
				</div>
			</SectionSeparator>
		</section>
	);
});

Experience.displayName = 'Experience';

export default Experience;
