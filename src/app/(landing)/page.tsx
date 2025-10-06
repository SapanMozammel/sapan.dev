import Hero from '@/components/layout/Hero';
import Technologies from '@/components/layout/Technologies';
import Testimonials from '@/components/layout/Testimonials';
import { memo } from 'react';

const LandingPage = memo(() => {
	return (
		<>
			<Hero />
			<Technologies />
			<Testimonials />
		</>
	);
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;
