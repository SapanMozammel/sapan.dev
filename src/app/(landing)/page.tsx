import SectionSeparator from '@/components/layout/common/SectionSeparator';
import Hero from '@/components/layout/Hero';

const page = () => {
	return (
		<>
			<Hero />
			<section className='relative z-1 h-screen pt-[20vw]'>
				<SectionSeparator lts rts lbs rbs bl ll rl>
					<div className='container flex w-full grow flex-col items-center justify-start gap-4 py-8 text-center sm:py-12 lg:py-16'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolore facilis voluptatibus saepe porro dolor illum, sed exercitationem vitae quas explicabo, accusamus libero necessitatibus
						vel dicta commodi deserunt nesciunt! Velit.
					</div>
				</SectionSeparator>
			</section>
		</>
	);
};

export default page;
