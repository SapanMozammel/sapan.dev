import Experience from '@/components/layout/Experience';
import Hero from '@/components/layout/Hero';
import Portfolio from '@/components/layout/Portfolio';
import Technologies from '@/components/layout/Technologies';
import Testimonials from '@/components/layout/Testimonials';
import { memo } from 'react';

const LandingPage = memo(() => {
	return (
		<>
			<Hero />
			<Technologies />
			<Testimonials />
			<Portfolio />
			<Experience />
		</>
	);
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;
