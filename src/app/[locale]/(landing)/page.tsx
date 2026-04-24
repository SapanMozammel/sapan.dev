import Blog from '@/components/layout/Blog';
import Cta from '@/components/layout/Cta';
import Experience from '@/components/layout/Experience';
import Faq from '@/components/layout/Faq';
import Hero from '@/components/layout/Hero';
import { setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';

// Below-fold client components — lazy-loaded to reduce initial JS bundle
const Technologies = dynamic(() => import('@/components/layout/Technologies'));
const Portfolio = dynamic(() => import('@/components/layout/Portfolio'));
const Testimonials = dynamic(() => import('@/components/layout/Testimonials'));
const Workflow = dynamic(() => import('@/components/layout/Workflow'));
const ContactModal = dynamic(() => import('@/components/ui/contact-modal'));

type Props = { params: Promise<{ locale: string }> };

const LandingPage = async ({ params }: Props) => {
	const { locale } = await params;
	setRequestLocale(locale);
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
			<Cta />
			<ContactModal />
		</>
	);
};

export default LandingPage;
