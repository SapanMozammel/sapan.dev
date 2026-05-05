'use client';

import Marquee from '@/components/ui/marquee';
import { TESTIMONIAL_LIST } from '@/data/content/testimonials';
import { useTranslations } from 'next-intl';
import { memo } from 'react';
import SectionTitle from '../common/section-title';
import TestimonialBackground from './testimonial-background';
import TestimonialCard from './testimonial-card';

// Distinct prime-stride permutations so the two rows feel shuffled, not mirrored.
const TOP_ROW = TESTIMONIAL_LIST.map((_, i, arr) => arr[(i * 5) % arr.length]!);
const BOTTOM_ROW = TESTIMONIAL_LIST.map((_, i, arr) => arr[(9 + i * 7) % arr.length]!);

const Testimonials = memo(() => {
	const translate = useTranslations('home.testimonials');

	return (
		<section id='testimonials' className='relative z-1 pb-16 sm:pb-20 lg:pb-24'>
			<TestimonialBackground>
				<div className='container-fluid flex w-full grow flex-col gap-8'>
					<SectionTitle className='container' subtitle={translate('subtitle')} title={translate('title')} watermark='Testimonials' />
					<div className='relative z-2 flex w-full flex-col gap-4 overflow-hidden p-px md:gap-6 lg:gap-8'>
						<Marquee pauseOnHover speed={60}>
							{TOP_ROW.map((testimonial, index) => (
								<TestimonialCard key={index} testimonial={testimonial} />
							))}
						</Marquee>
						<Marquee pauseOnHover speed={60} direction='right'>
							{BOTTOM_ROW.map((testimonial, index) => (
								<TestimonialCard key={index} testimonial={testimonial} />
							))}
						</Marquee>
					</div>
				</div>
			</TestimonialBackground>
		</section>
	);
});

Testimonials.displayName = 'Testimonials';

export default Testimonials;
