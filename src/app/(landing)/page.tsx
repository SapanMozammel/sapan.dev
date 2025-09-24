import Hero from '@/components/layout/Hero';
import Technologies from '@/components/layout/Technologies';
import { memo } from 'react';

const LandingPage = memo(() => {
	return (
		<>
			<Hero />
			<Technologies />
		</>
	);
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;
