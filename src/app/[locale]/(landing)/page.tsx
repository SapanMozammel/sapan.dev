import Blog from '@/components/layout/Blog';
import Cta from '@/components/layout/Cta';
import Experience from '@/components/layout/Experience';
import Faq from '@/components/layout/Faq';
import Hero from '@/components/layout/Hero';
import Portfolio from '@/components/layout/Portfolio';
import Technologies from '@/components/layout/Technologies';
import Testimonials from '@/components/layout/Testimonials';
import Workflow from '@/components/layout/Workflow';
import ContactModal from '@/components/ui/contact-modal';

const LandingPage = () => (
	<>
		<Hero />
		<Technologies />
		<Portfolio />
		<Experience />
		<Testimonials />
		<Workflow />
		<Blog />
		<Faq />
		<Cta />
		<ContactModal />
	</>
);

export default LandingPage;
