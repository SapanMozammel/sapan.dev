import { DiamondGrid } from '@/components/ui/diamond-grid';
import { memo } from 'react';
import SectionSeparator from '../common/SectionSeparator';
import SectionTitle from '../common/SectionTitle';

// Move outside component to prevent recreation on every render
const technologies = [
	{ name: 'React' },
	{ name: 'Next.js' },
	{ name: 'TypeScript' },
	{ name: 'Three.js' },
	{ name: 'Tailwind' },
	{ name: 'Framer Motion' },
	{ name: 'WordPress' },
	{ name: 'Webpack' },
	{ name: 'Sass' },
	{ name: 'Node.js' },
	{ name: 'Vue.js' },
	{ name: 'Angular' },
	{ name: 'Python' },
	{ name: 'Docker' },
	{ name: 'AWS' },
	{ name: 'MongoDB' },
];

const Technologies = memo(() => {
	return (
		<section className='relative z-1 min-h-screen pt-[20vw]'>
			<SectionSeparator lts rts lbs rbs bl ll rl>
				<div className='container flex w-full grow flex-col items-center justify-start gap-4 pb-8 text-center sm:pb-12 lg:pb-16'>
					<SectionTitle subtitle='Technologies' title={`I'm an Expertise In`} watermark='Technologies' />
					<DiamondGrid items={technologies}>
						{(item) => (
							<div key={`${item.name}-${item.index}`} className='flex aspect-video w-full items-center justify-center rounded-2xl bg-red-400 text-sm font-medium text-white'>
								{item.name}
							</div>
						)}
					</DiamondGrid>
				</div>
			</SectionSeparator>
		</section>
	);
});

Technologies.displayName = 'Technologies';

export default Technologies;
