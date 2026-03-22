import Experience from '@/components/layout/Experience';
import Hero from '@/components/layout/Hero';
import Portfolio from '@/components/layout/Portfolio';
import Technologies from '@/components/layout/Technologies';
import Testimonials from '@/components/layout/Testimonials';
import Workflow from '@/components/layout/Workflow';
import { memo } from 'react';

const LandingPage = memo(() => {
	return (
		<>
			<Hero />
			<Technologies />
			<Portfolio />
			<Experience />
			<Testimonials />
			<Workflow />
		</>
	);
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;
