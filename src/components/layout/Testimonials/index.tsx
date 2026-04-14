'use client';

import Marquee from '@/components/ui/marquee';
import { TESTIMONIAL_LIST } from '@/data/content/testimonials';
import { memo } from 'react';
import SectionTitle from '../common/SectionTitle';
import TestimonialBackground from './TestimonialBackground';
import TestimonialCard from './TestimonialCard';

const Testimonials = memo(() => {
	return (
		<section id='testimonials' className='relative z-1 pb-16 sm:pb-20 lg:pb-24'>
			<TestimonialBackground>
				<div className='container-fluid flex w-full grow flex-col gap-8'>
					<SectionTitle className='container' subtitle='Testimonials' title={`What People Say About Me`} watermark='Testimonials' />
					<div className='relative z-2 flex w-full flex-col gap-4 overflow-hidden p-px md:gap-6 lg:gap-8'>
						<Marquee pauseOnHover speed={60}>
							{TESTIMONIAL_LIST.map((testimonial, index) => (
								<TestimonialCard key={index} testimonial={testimonial} />
							))}
						</Marquee>
						<Marquee pauseOnHover speed={60} direction='right'>
							{TESTIMONIAL_LIST.map((testimonial, index) => (
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
