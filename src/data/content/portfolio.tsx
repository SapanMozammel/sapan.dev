import BetterLinksLogo from '@/components/icons/projects/better-links/logo';
import BetterdocsLogo from '@/components/icons/projects/betterdocs/logo';
import EasyJobsLogo from '@/components/icons/projects/easy-jobs/logo';
import NotificationXLogo from '@/components/icons/projects/notification-x/logo';
import SchedulePressLogo from '@/components/icons/projects/schedule-press/logo';
import TemplatelyLogo from '@/components/icons/projects/templately/logo';
import TubeOnAILogo from '@/components/icons/projects/tube-on-ai/logo';
import WpDeveloperStoreLogo from '@/components/icons/projects/wp-developer-store/logo';
import XCloudLogo from '@/components/icons/projects/x-cloud/logo';
import type { PortfolioProject } from '@/types/portfolio';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
	{
		colorScheme: 'sky',
		title: 'TubeOnAI',
		description: `AI platform that summarizes videos, podcasts, PDFs, and articles into actionable content. Owned the Next.js web app — UI system, React Query data layer, audio player integration, and Zod-validated form flows across the full product surface.`,
		role: 'Frontend Developer',
		technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'React Query', 'React Hook Form', 'Zod', 'Firebase', 'React Modern Audio Player', 'Sentry'],
		link: 'https://web.tubeonai.com/',
		icon: <TubeOnAILogo className='h-full w-auto' />,
		image: '/images/portfolio/tubeonai.png',
	},
	{
		colorScheme: 'indigo',
		title: 'Templately',
		description: `WordPress template cloud where teams build, share, and manage professional websites at scale. Worked across the admin SPA, the Next.js marketing site, and the WordPress plugin frontend in parallel — plus enterprise tools and internal apps used by the wider engineering org.`,
		role: 'Frontend Developer & Plugin Developer',
		technologies: ['TypeScript', 'React.js', 'Next.js', 'Redux.js', 'GraphQL', 'Tailwind CSS', 'SASS', 'shadcn/ui', 'WordPress', 'Webpack', 'Vite', 'Vercel'],
		link: 'https://templately.com/',
		icon: <TemplatelyLogo className='h-full w-auto' />,
		image: '/images/portfolio/templately.png',
	},
	{
		colorScheme: 'blue',
		title: 'xCloud',
		description: `Cloud hosting platform for managing and deploying digital resources at scale. Architected the v1 frontend in Vue.js + Tailwind CSS — component structure, state synchronization across the dashboard, optimistic updates on the ops panel, and clean handoff that ramped the next frontend developer in days.`,
		role: 'Frontend Developer',
		technologies: ['Vue.js', 'Vite', 'Tailwind CSS', 'Axios', 'Lodash', 'Laravel'],
		link: 'https://app.xcloud.host/',
		icon: <XCloudLogo className='h-full w-auto' />,
		image: '/images/portfolio/xcloud.png',
	},
	{
		colorScheme: 'green',
		title: 'Betterdocs',
		description: `WordPress documentation and knowledge-base plugin used by support and product teams to ship self-serve help. Re-architected the admin panel, built the ApexCharts analytics dashboard, and shipped the FAQ Builder — UI redesign measurably reduced weekly support ticket volume.`,
		role: 'Plugin Developer',
		technologies: ['React.js', 'Draft.js', 'WordPress', 'QuickBuilder', 'React Query', 'Axios', 'Lodash', 'ApexCharts', 'Webpack'],
		link: 'https://betterdocs.co/',
		icon: <BetterdocsLogo className='h-full w-auto' />,
		image: '/images/portfolio/betterdocs.png',
	},
	{
		colorScheme: 'cyan',
		title: 'WpDeveloper Store',
		description: `Customer dashboard where WPDeveloper users manage licenses, renewals, and premium product access. Built the React + Redux dashboard with ApexCharts-driven analytics views and tightened the data layer for predictable state across multi-step flows.`,
		role: 'Frontend Developer',
		technologies: ['React.js', 'Redux.js', 'Bootstrap', 'ApexCharts', 'Axios', 'SCSS'],
		link: 'https://store.wpdeveloper.com/',
		icon: <WpDeveloperStoreLogo className='h-full w-auto' />,
		image: '/images/portfolio/wpdeveloper-store.png',
	},
	{
		colorScheme: 'teal',
		title: 'NotificationX',
		description: `WordPress marketing and social-proof plugin showing real-time alerts for sales, reviews, and signups across millions of sites. Refined the admin UX, modernised feature-integration flows, and rebuilt notification authoring with QuickBuilder for less friction in the editor.`,
		role: 'Plugin Developer',
		technologies: ['TypeScript', 'React.js', 'WordPress', 'ApexCharts', 'Draft.js', 'QuickBuilder', 'Lodash'],
		link: 'https://notificationx.com/',
		icon: <NotificationXLogo className='h-full w-auto' />,
		image: '/images/portfolio/notificationx.png',
	},
	{
		colorScheme: 'violet',
		title: 'Easy.Jobs',
		description: `AI-powered recruitment SaaS with customizable career sites, automated screening, and applicant tracking for businesses of every size. Joined as the first frontend developer and shipped the v1 in Vue.js + Bootstrap — career-site interfaces and reusable component patterns still in use today.`,
		role: 'Frontend Developer',
		technologies: ['Vue.js', 'Bootstrap', 'jQuery', 'Laravel', 'Lodash', 'SCSS', 'Axios', 'ApexCharts'],
		link: 'https://app.easy.jobs/',
		icon: <EasyJobsLogo className='h-full w-auto' />,
		image: '/images/portfolio/easyjobs.png',
	},
	{
		colorScheme: 'emerald',
		title: 'SchedulePress',
		description: `WordPress editorial and scheduling plugin for teams running structured content publishing pipelines. Refined the admin-side scheduling UI, hardened missed-schedule edge cases, and improved editorial workflow ergonomics for daily editor use.`,
		role: 'Frontend Developer',
		technologies: ['React.js', 'WordPress', 'WebPack', 'SCSS'],
		link: 'https://schedulepress.com/',
		icon: <SchedulePressLogo className='h-full w-auto' />,
		image: '/images/portfolio/schedulepress.png',
	},
	{
		colorScheme: 'fuchsia',
		title: 'BetterLinks',
		description: `WordPress link management and URL shortener with branded-link analytics for marketing teams. Set up the frontend foundation as the first developer on the project, built core admin features, and shaped the analytics views with ApexCharts and Redux.`,
		role: 'Frontend Developer',
		technologies: ['React.js', 'Redux.js', 'WordPress', 'ApexCharts', 'Axios', 'SCSS', 'MaterialUI', 'Formik', 'Gulp'],
		link: 'https://betterlinks.io/',
		icon: <BetterLinksLogo className='h-full w-auto' />,
		image: '/images/portfolio/betterlinks.png',
	},
];
