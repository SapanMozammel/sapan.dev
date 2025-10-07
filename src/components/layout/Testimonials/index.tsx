'use client';

import Image from 'next/image';
import { memo } from 'react';
import Marquee from 'react-fast-marquee';
import SectionTitle from '../common/SectionTitle';
import TestimonialBackground from './TestimonialBackground';
const testimonialList = [
	{
		message: 'Working with Sapan was one of the best development experiences we’ve had. He understood our vision immediately and built the site exactly how we wanted — clean, fast, and modern.',
		name: 'Emma Rodriguez',
		designation: 'Marketing Lead',
		company: 'NovaReach Digital',
		avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
		createdAt: '2025-02-16',
	},
	{
		message: 'Sapan rebuilt our frontend using Next.js and Tailwind, and the performance difference was night and day. He’s extremely detail-oriented and easy to work with.',
		name: 'Arjun Mehta',
		designation: 'CTO',
		company: 'CloudStrive',
		avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
		createdAt: '2025-04-10',
	},
	{
		message: 'We hired Sapan to redesign our product dashboard. The result was absolutely stunning — user-friendly, beautiful, and fast. He also handled feedback gracefully throughout the project.',
		name: 'Lisa Coleman',
		designation: 'Product Manager',
		company: 'FinSync Solutions',
		avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
		createdAt: '2025-03-07',
	},
	{
		message: 'He helped us integrate GrapesJS into our CMS, something no one else could figure out properly. The custom blocks he built work perfectly.',
		name: 'Daniel Yoon',
		designation: 'Senior Developer',
		company: 'EditPro Systems',
		avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
		createdAt: '2025-01-30',
	},
	{
		message: 'Our Shopify app development was smooth and efficient. Sapan knows his way around the Shopify ecosystem very well and helped us push our MVP live ahead of schedule.',
		name: 'Hannah Park',
		designation: 'Founder',
		company: 'ShopPilot',
		avatar: 'https://randomuser.me/api/portraits/women/35.jpg',
		createdAt: '2025-03-24',
	},
	{
		message: 'Sapan took over our React codebase and cleaned up months of technical debt. Now our app loads twice as fast and the code is actually maintainable.',
		name: 'Michael Torres',
		designation: 'Engineering Manager',
		company: 'ByteWorks',
		avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
		createdAt: '2025-02-11',
	},
	{
		message: 'We worked with Sapan on a theming system (light/dark/system). His implementation was so smooth that our users thought we rebuilt the whole platform.',
		name: 'Sara Jensen',
		designation: 'UI Designer',
		company: 'Moodify',
		avatar: 'https://randomuser.me/api/portraits/women/48.jpg',
		createdAt: '2025-03-12',
	},
	{
		message: 'He has this rare combination of technical depth and great design sense. Our internal dashboard feels so much more intuitive now.',
		name: 'Victor Liu',
		designation: 'Head of Data',
		company: 'InsightMatrix',
		avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
		createdAt: '2025-04-18',
	},
	{
		message: 'We needed a quick landing page built in React, and Sapan delivered it within 48 hours — responsive, animated, and fully optimized for SEO.',
		name: 'Alicia Gomez',
		designation: 'Brand Director',
		company: 'Launchify',
		avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
		createdAt: '2025-05-05',
	},
	{
		message: 'Sapan has been our go-to frontend engineer for over a year. He’s consistent, reliable, and always suggests better solutions than we thought of.',
		name: 'Ryan Wilson',
		designation: 'CEO',
		company: 'DevHouse Studio',
		avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
		createdAt: '2025-01-19',
	},
	{
		message: 'We had issues integrating media tools into our React project. Sapan not only fixed it but explained everything clearly to our team. Great communicator!',
		name: 'Chloe Martin',
		designation: 'Frontend Lead',
		company: 'StreamLab',
		avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
		createdAt: '2025-04-02',
	},
	{
		message: 'His attention to accessibility and performance is impressive. The app feels polished and thoughtful — exactly what we wanted for our clients.',
		name: 'Adam Richardson',
		designation: 'Product Owner',
		company: 'UXCloud',
		avatar: 'https://randomuser.me/api/portraits/men/40.jpg',
		createdAt: '2025-03-26',
	},
	{
		message: 'I was amazed by how clean and maintainable his codebase was. Every feature worked perfectly out of the box.',
		name: 'Nadia Farooq',
		designation: 'Tech Consultant',
		company: 'BuildSphere',
		avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
		createdAt: '2025-02-06',
	},
	{
		message: 'Sapan is the kind of developer you can rely on. He communicates clearly, never misses deadlines, and the quality of work speaks for itself.',
		name: 'Owen Carter',
		designation: 'Operations Manager',
		company: 'LoopOne',
		avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
		createdAt: '2025-04-22',
	},
	{
		message: 'He helped modernize our legacy app into a clean Next.js build. Our users immediately noticed the speed improvements.',
		name: 'Aisha Rahman',
		designation: 'Project Lead',
		company: 'CloudShift',
		avatar: 'https://randomuser.me/api/portraits/women/59.jpg',
		createdAt: '2025-03-18',
	},
	{
		message: 'I loved working with Sapan — he gets design, UX, and tech all at once. That’s rare in developers. Highly recommend him.',
		name: 'Jack Peterson',
		designation: 'Founder',
		company: 'FlowForge Studio',
		avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
		createdAt: '2025-05-01',
	},
	{
		message: 'We collaborated on a ReactFlow project, and Sapan made it look effortless. He’s definitely a problem-solver, not just a coder.',
		name: 'Priya Nair',
		designation: 'Software Engineer',
		company: 'Graphica Labs',
		avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
		createdAt: '2025-02-14',
	},
	{
		message: 'The dashboard Sapan built for us using Prisma and Tailwind looks fantastic. Even our non-technical team can use it easily.',
		name: 'Ethan Murphy',
		designation: 'Data Manager',
		company: 'TrackPoint',
		avatar: 'https://randomuser.me/api/portraits/men/38.jpg',
		createdAt: '2025-04-05',
	},
	{
		message: 'He went above and beyond to ensure everything was pixel-perfect. You can tell he truly cares about the final product.',
		name: 'Zara Collins',
		designation: 'Art Director',
		company: 'CreativePulse',
		avatar: 'https://randomuser.me/api/portraits/women/64.jpg',
		createdAt: '2025-03-03',
	},
	{
		message: 'Sapan is not just a developer — he’s a partner. His suggestions improved our entire product strategy. Can’t recommend him enough.',
		name: 'Marcus Bell',
		designation: 'Head of Product',
		company: 'GrowthLabs',
		avatar: 'https://randomuser.me/api/portraits/men/27.jpg',
		createdAt: '2025-05-12',
	},
];

const TestimonialCard = memo(({ testimonial }: { testimonial: (typeof testimonialList)[0] }) => (
	<div className='mx-2 flex aspect-[100/40] w-100 shrink-0 items-center gap-4 rounded-3xl bg-white/75 px-6 py-2 backdrop-blur-xl sm:aspect-[100/45] sm:w-110 sm:gap-6 sm:px-8 md:mx-3 lg:mx-4 dark:bg-black/50'>
		<div className='relative aspect-square w-20 shrink-0 overflow-hidden rounded-full sm:w-24'>
			<Image src={testimonial.avatar} alt={testimonial.name} fill className='rounded-full object-cover' />
		</div>
		<div className='font-sora flex grow flex-col justify-center gap-2 sm:gap-3.5'>
			<p className='text-secondary-600 dark:text-secondary-400 line-clamp-4 text-xs leading-relaxed italic sm:text-sm'>"{testimonial.message}"</p>
			<div className='flex flex-col'>
				<p className='text-dark text-base font-medium tracking-wide sm:text-lg dark:text-white'>{testimonial.name}</p>
				<p className='text-secondary-600 dark:text-secondary-400 text-[0.6875em]'>
					{testimonial.designation} @{testimonial.company}
				</p>
			</div>
		</div>
	</div>
));

TestimonialCard.displayName = 'TestimonialCard';

const Testimonials = memo(() => {
	return (
		<section className='relative z-1 pb-12 sm:pb-16 lg:pb-20'>
			<TestimonialBackground>
				<div className='flex w-full grow flex-col gap-8'>
					<SectionTitle className='container' subtitle='Testimonials' title={`What People Say About Me`} watermark='Testimonials' />
					<div className='relative z-2 flex w-full flex-col gap-4 overflow-hidden md:gap-6 lg:gap-8'>
						<Marquee pauseOnHover speed={60}>
							{testimonialList.map((testimonial, index) => (
								<TestimonialCard key={index} testimonial={testimonial} />
							))}
						</Marquee>
						<Marquee pauseOnHover speed={60} direction='right'>
							{testimonialList.map((testimonial, index) => (
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
