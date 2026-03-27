import Logo from '@/components/icons/Logo';
import SectionSeparator from '@/components/layout/common/SectionSeparator';
import Link from 'next/link';
import React from 'react';
import FooterConnect from './FooterConnect';
import FooterNav from './FooterNav';

const Footer = () => (
	<React.Fragment>
		<div className='relative z-1'>
			<SectionSeparator lts rts lbs rbs tl bl ll rl>
				<div className='container-fluid'>
					<div className='pointer-events-none flex items-center justify-center overflow-hidden py-6 select-none'>
						<span
							aria-hidden
							className='font-bungee text-center text-[15.5vw] leading-none font-normal tracking-wider !text-transparent uppercase [-webkit-text-stroke:2px_color-mix(in_srgb,var(--color-primary)_25%,transparent)] dark:[-webkit-text-stroke:2px_color-mix(in_srgb,var(--color-success)_25%,transparent)]'
						>
							sapan.dev
						</span>
					</div>
				</div>
			</SectionSeparator>
		</div>
		<div className='relative z-1'>
			<SectionSeparator lts rts tl ll rl>
				<div className='container-fluid'>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6'>
						<div className='border-secondary-400 dark:border-secondary-600 col-span-1 flex flex-col gap-5 border-b px-6 py-10 sm:col-span-2 lg:border-r lg:border-b-0'>
							<Link href='/' className='inline-flex items-center gap-1.5 sm:gap-2'>
								<Logo className='h-6 sm:h-8' />
								<span className='font-bungee from-primary to-info dark:from-success bg-gradient-to-r bg-clip-text text-base !leading-none font-normal text-transparent uppercase sm:text-2xl'>
									sapan.dev
								</span>
							</Link>
							<div className='flex flex-col gap-2'>
								<p className='text-secondary-600 dark:text-secondary-400 text-base leading-relaxed font-normal'>With every line of JavaScript, shaping the future of web development.</p>
								<p className='text-secondary-600 dark:text-secondary-400 text-sm leading-relaxed font-normal'>
									With 5+ years of dynamic experience building applications using React, Redux, GraphQL, Next.js, Three.js, Node.js and many more, I take pride in writing clean, maintainable code while
									adhering to engineering best practices.
								</p>
							</div>
						</div>
						<div className='border-secondary-400 dark:border-secondary-600 col-span-1 border-b px-6 py-10 sm:border-r sm:border-b-0 lg:col-span-2'>
							<div className='mx-auto flex max-w-75 flex-col justify-start gap-4 self-center'>
								<span className='font-sora text-secondary-400 dark:text-secondary-500 text-xs font-semibold uppercase'>Navigate</span>
								<FooterNav />
							</div>
						</div>
						<div className='col-span-1 px-6 py-10 lg:col-span-2'>
							<div className='flex flex-col justify-start gap-4'>
								<span className='font-sora text-secondary-400 dark:text-secondary-500 text-xs font-semibold uppercase'>Connect</span>
								<FooterConnect />
							</div>
						</div>
					</div>
				</div>
			</SectionSeparator>
		</div>
		<footer className='border-secondary-400 dark:border-secondary-600 border-t border-solid backdrop-blur-xl'>
			<div className='container-fluid'>
				<div className='flex flex-col items-center justify-between gap-1 px-0 py-4 sm:flex-row sm:py-6'>
					<p className='text-secondary-600 dark:text-secondary-400 text-sm tracking-wider'>&copy; {new Date().getFullYear()} All rights reserved.</p>
					<p className='text-secondary-600 dark:text-secondary-400 text-sm tracking-wider'>Designed & Developed by SapanMozammel</p>
				</div>
			</div>
		</footer>
	</React.Fragment>
);

export default Footer;
