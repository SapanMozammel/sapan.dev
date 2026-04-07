import Logo from '@/components/icons/Logo';
import ConnectButton from '@/components/layout/common/ConnectButton';
import SectionSeparator from '@/components/layout/common/SectionSeparator';
import CtaBackground from '@/components/layout/Cta/CtaBackground';
import React from 'react';
import CtaConnect from './CtaConnect';
import CtaLogo from './CtaLogo';
import CtaNav from './CtaNav';

const Cta = () => (
	<React.Fragment>
		<section className='relative z-1 py-8 sm:py-12 lg:py-16'>
			<SectionSeparator lts rts lbs rbs tl bl ll rl>
				<div className='container'>
					<div className='bg-dark border-success/15 relative z-10 mx-auto max-w-5xl overflow-hidden rounded-2xl border shadow-[0_8px_40px_-12px_color-mix(in_srgb,var(--color-primary)_25%,transparent),0_2px_12px_color-mix(in_srgb,var(--color-success)_15%,transparent)]'>
						<CtaBackground />
						<div className='relative z-10 flex flex-col items-center gap-3 p-8 text-center sm:gap-4 sm:p-12 lg:p-16'>
							<Logo className='h-10 w-10 sm:h-12 sm:w-12' />
							<h2 className='font-cg text-3xl !leading-tight font-medium tracking-wider text-white sm:text-5xl'>
								Have a project in mind?
								<br />
								<span className='font-cg text-success font-bold tracking-tight'>Let&apos;s build it together.</span>
							</h2>
							<p className='text-secondary-400 inline-flex max-w-[90ch] text-sm !leading-relaxed tracking-wider sm:text-base'>
								Whether you need a full product, a landing page,
								<br className='hidden sm:block' />
								or just want to explore ideas — I&apos;m here to collaborate.
							</p>
							<ConnectButton fill gradient className='mt-4 sm:mt-6' />
						</div>
					</div>
				</div>
			</SectionSeparator>
		</section>
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
							<CtaLogo />
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
								<CtaNav />
							</div>
						</div>
						<div className='col-span-1 px-6 py-10 lg:col-span-2'>
							<div className='flex flex-col justify-start gap-4'>
								<CtaConnect />
							</div>
						</div>
					</div>
				</div>
			</SectionSeparator>
		</div>
	</React.Fragment>
);

export default Cta;
