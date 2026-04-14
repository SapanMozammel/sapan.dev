import Blog from '@/components/layout/Blog';
import Cta from '@/components/layout/Cta';
import Experience from '@/components/layout/Experience';
import Faq from '@/components/layout/Faq';
import Hero from '@/components/layout/Hero';
import dynamic from 'next/dynamic';

// Below-fold client components — lazy-loaded to reduce initial JS bundle
const Technologies = dynamic(() => import('@/components/layout/Technologies'));
const Portfolio = dynamic(() => import('@/components/layout/Portfolio'));
const Testimonials = dynamic(() => import('@/components/layout/Testimonials'));
const Workflow = dynamic(() => import('@/components/layout/Workflow'));
const ContactModal = dynamic(() => import('@/components/ui/contact-modal'));

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
