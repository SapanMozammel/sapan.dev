import { getBlurDataURL } from '@/lib/utils/image';
import type { TestimonialData } from '@/types/testimonial';
import Image from 'next/image';
import { memo } from 'react';

const AVATAR_SIZE = 96;
const AVATAR_BLUR_PLACEHOLDER = getBlurDataURL(AVATAR_SIZE, AVATAR_SIZE);

const TestimonialCard = memo(({ testimonial }: { testimonial: TestimonialData }) => (
	<div className='mx-2 flex aspect-[100/40] w-100 shrink-0 items-center gap-4 rounded-3xl bg-white/50 px-6 py-2 backdrop-blur-xl sm:aspect-[100/45] sm:w-110 sm:gap-6 sm:px-8 md:mx-3 lg:mx-4 dark:bg-black/50'>
		<div className='relative aspect-square w-20 shrink-0 overflow-hidden rounded-full sm:w-24'>
			<Image
				src={testimonial.avatar}
				alt={`${testimonial.name} - ${testimonial.designation} at ${testimonial.company}`}
				fill
				sizes='(max-width: 640px) 80px, 96px'
				className='rounded-full object-cover'
				placeholder='blur'
				blurDataURL={AVATAR_BLUR_PLACEHOLDER}
				loading='lazy'
				quality={85}
			/>
		</div>
		<div className='flex grow flex-col justify-center gap-1.5 sm:gap-2.5'>
			<p className='text-secondary-600 dark:text-secondary-400 text-paragraph-small line-clamp-4 italic'>"{testimonial.message}"</p>
			<div className='font-hg flex flex-col'>
				<h5 className='text-dark text-heading-small tracking-wide dark:text-white'>{testimonial.name}</h5>
				<p className='text-secondary-600 dark:text-secondary-400 text-xs'>
					{testimonial.designation} @{testimonial.company}
				</p>
			</div>
		</div>
	</div>
));

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;
