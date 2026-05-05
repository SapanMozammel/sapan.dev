import BetterdocsLogo from '@/components/icons/projects/betterdocs/logo';
import BetterLinksLogo from '@/components/icons/projects/better-links/logo';
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
		description: `TubeOnAI is an AI platform that summarizes and repurposes videos, podcasts, PDFs, and articles into clear, actionable content. As a Frontend Developer, I worked on the Next.js web app, building UI components, integrating APIs, and ensuring a smooth, responsive experience across devices.`,
		role: 'Frontend Developer',
		technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'React Query', 'React Hook Form', 'Zod', 'Firebase', 'React Modern Audio Player', 'Sentry'],
		link: 'https://web.tubeonai.com/',
		icon: <TubeOnAILogo className='h-full w-auto' />,
		image: '/images/portfolio/tubeonai.png',
	},
	{
		colorScheme: 'indigo',
		title: 'Templately',
		description: `Templately is a WordPress-based template cloud platform that empowers users and teams to build, share, and manage professional websites seamlessly. Here, I contributed to the Admin Panel, Landing App, WordPress Plugin, enterprise tools, and internal apps to enhance performance and UX.`,
		role: 'Frontend Developer & Plugin Developer',
		technologies: ['TypeScript', 'React.js', 'Next.js', 'Redux.js', 'GraphQL', 'Tailwind CSS', 'SASS', 'shadcn/ui', 'WordPress', 'Webpack', 'Vite', 'Vercel'],
		link: 'https://templately.com/',
		icon: <TemplatelyLogo className='h-full w-auto' />,
		image: '/images/portfolio/templately.png',
	},
	{
		colorScheme: 'blue',
		title: 'xCloud',
		description: `xCloud is a scalable cloud-based hosting platform designed to manage, store, and process digital resources efficiently. It provides secure access, real-time operations, and performance-focused workflows. Here, I worked on the frontend architecture design with Vue.js and Tailwind CSS.`,
		role: 'Frontend Developer',
		technologies: ['Vue.js', 'Vite', 'Tailwind CSS', 'Axios', 'Lodash', 'Laravel'],
		link: 'https://app.xcloud.host/',
		icon: <XCloudLogo className='h-full w-auto' />,
		image: '/images/portfolio/xcloud.png',
	},
	{
		colorScheme: 'green',
		title: 'Betterdocs',
		description: `BetterDocs is a WordPress documentation and knowledge base plugin that helps teams create, organize, and present help content efficiently. It enhances self-service with instant search, structured categories, analytics, faq, chatbot, and clean layouts. I worked on re-architecting the admin panel, building the analytics dashboard, and developing the FAQ Builder.`,
		role: 'Plugin Developer',
		technologies: ['React.js', 'Draft.js', 'WordPress', 'QuickBuilder', 'React Query', 'Axios', 'Lodash', 'ApexCharts', 'Webpack'],
		link: 'https://betterdocs.co/',
		icon: <BetterdocsLogo className='h-full w-auto' />,
		image: '/images/portfolio/betterdocs.png',
	},
	{
		colorScheme: 'cyan',
		title: 'WpDeveloper Store',
		description: `All WPDeveloper users use this application to maintain their licenses and buy premium items. For all WPDeveloper users, this is the Dashboard app. This dashboard application is built with React.Js. As a front-end developer, I used Bootstrap and React.Js to create this dashboard.`,
		role: 'Frontend Developer',
		technologies: ['React.js', 'Redux.js', 'Bootstrap', 'ApexCharts', 'Axios', 'SCSS'],
		link: 'https://store.wpdeveloper.com/',
		icon: <WpDeveloperStoreLogo className='h-full w-auto' />,
		image: '/images/portfolio/wpdeveloper-store.png',
	},
	{
		colorScheme: 'teal',
		title: 'NotificationX',
		description: `NotificationX is a WordPress marketing and social proof plugin that displays real-time notifications to boost conversions and engagement. It supports sales alerts, reviews, comments, and email signups. I worked on improving the admin experience, feature integration, and UI workflows for better usability.`,
		role: 'Plugin Developer',
		technologies: ['TypeScript', 'React.js', 'WordPress', 'ApexCharts', 'Draft.js', 'QuickBuilder', 'Lodash'],
		link: 'https://notificationx.com/',
		icon: <NotificationXLogo className='h-full w-auto' />,
		image: '/images/portfolio/notificationx.png',
	},
	{
		colorScheme: 'violet',
		title: 'Easy.Jobs',
		description: `easy.jobs is an AI-powered recruitment and applicant tracking SaaS that helps businesses attract, evaluate, and hire top talent efficiently with customizable career sites, automated screening, and team collaboration tools. As the project's first front-end developer, I worked with Bootstrap, Vue.js, and Laravel.`,
		role: 'Frontend Developer',
		technologies: ['Vue.js', 'Bootstrap', 'jQuery', 'Laravel', 'Lodash', 'SCSS', 'Axios', 'ApexCharts'],
		link: 'https://app.easy.jobs/',
		icon: <EasyJobsLogo className='h-full w-auto' />,
		image: '/images/portfolio/easyjobs.png',
	},
	{
		colorScheme: 'emerald',
		title: 'SchedulePress',
		description: `SchedulePress is a WordPress editorial and scheduling plugin that helps teams plan, manage, and automate content publishing. It supports scheduled posts, missed schedule handling, and editorial workflows. I contributed by improving admin-side features, refining scheduling logic, and enhancing UI workflows for better usability.`,
		role: 'Frontend Developer',
		technologies: ['React.js', 'WordPress', 'WebPack', 'SCSS'],
		link: 'https://schedulepress.com/',
		icon: <SchedulePressLogo className='h-full w-auto' />,
		image: '/images/portfolio/schedulepress.png',
	},
	{
		colorScheme: 'fuchsia',
		title: 'BetterLinks',
		description: `BetterLinks is a WordPress link management and URL shortener plugin for creating, organizing, and tracking branded links with analytics. As the first Frontend Developer on the project, I set up the frontend foundation, built admin features, enhanced analytics views, and refined UI workflows.`,
		role: 'Frontend Developer',
		technologies: ['React.js', 'Redux.js', 'WordPress', 'ApexCharts', 'Axios', 'SCSS', 'MaterialUI', 'Formik', 'Gulp'],
		link: 'https://betterlinks.io/',
		icon: <BetterLinksLogo className='h-full w-auto' />,
		image: '/images/portfolio/betterlinks.png',
	},
];
