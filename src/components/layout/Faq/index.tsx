import Accordion from '@/components/ui/accordion';
import { FAQ_DATA } from '@/data/content/faq';
import SectionSeparator from '../common/SectionSeparator';
import SectionTitle from '../common/SectionTitle';

const Faq = () => (
	<section className='relative z-1 pb-8 sm:pb-12 lg:pb-16'>
		<SectionSeparator lts rts lbs rbs tl bl ll rl>
			<div className='container flex w-full grow flex-col items-center justify-start gap-4 pb-8 sm:pb-12 lg:pb-16'>
				<SectionTitle subtitle='Things You Might Ask' title='Frequently Asked Questions' watermark='FAQ' />
				<Accordion items={FAQ_DATA} />
			</div>
		</SectionSeparator>
	</section>
);

export default Faq;
