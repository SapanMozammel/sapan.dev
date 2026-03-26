import Logo from '@/components/icons/Logo';
import ConnectButton from '@/components/layout/common/ConnectButton';
import SectionSeparator from '@/components/layout/common/SectionSeparator';
import CtaBackground from '@/components/layout/Cta/CtaBackground';

const Cta = () => (
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
							<span className='font-eb text-success tracking-tight'>Let&apos;s build it together.</span>
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
);

export default Cta;
