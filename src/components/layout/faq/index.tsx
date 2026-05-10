import SectionSeparator from '@/components/layout/common/section-separator';
import SectionTitle from '@/components/layout/common/section-title';
import Accordion from '@/components/ui/accordion';
import { FAQ_DATA } from '@/data/content/faq';
import { getTranslations } from 'next-intl/server';

const Faq = async () => {
	const translate = await getTranslations('home.faq');

	return (
		<section id='faq' className='relative z-1 pb-16 sm:pb-24 lg:pb-32'>
			<SectionSeparator lts rts lbs rbs tl bl ll rl>
				<div className='container flex w-full grow flex-col items-center justify-start gap-4'>
					<SectionTitle subtitle={translate('subtitle')} title={translate('title')} watermark='FAQ' />
					<Accordion items={FAQ_DATA} />
				</div>
			</SectionSeparator>
		</section>
	);
};

export default Faq;
