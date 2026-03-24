import Blog from '@/components/layout/Blog';
import Experience from '@/components/layout/Experience';
import Faq from '@/components/layout/Faq';
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
			<Blog />
			<Faq />
		</>
	);
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;
