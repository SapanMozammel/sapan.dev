import Blog from '@/components/layout/blog';
import Cta from '@/components/layout/cta';
import Experience from '@/components/layout/experience';
import Faq from '@/components/layout/faq';
import Hero from '@/components/layout/hero';
import { setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';

// Below-fold client components — lazy-loaded to reduce initial JS bundle
const Technologies = dynamic(() => import('@/components/layout/technologies'));
const Portfolio = dynamic(() => import('@/components/layout/portfolio'));
const Testimonials = dynamic(() => import('@/components/layout/testimonials'));
const Workflow = dynamic(() => import('@/components/layout/workflow'));
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
