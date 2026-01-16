import TubeOnAILogo from '@/lib/icons/projects/TubeOnAI/Logo';
import type { PortfolioProject } from '@/types/portfolio';
import BetterdocsLogo from '../icons/projects/Betterdocs/Logo';
import BetterLinksLogo from '../icons/projects/BetterLinks/Logo';
import EasyJobsLogo from '../icons/projects/EasyJobs/Logo';
import NotificationXLogo from '../icons/projects/NotificationX/Logo';
import SchedulePressLogo from '../icons/projects/SchedulePress/Logo';
import TemplatelyLogo from '../icons/projects/Templately/Logo';
import WpDeveloperStoreLogo from '../icons/projects/WpDeveloperStore/Logo';
import XCloudLogo from '../icons/projects/xCloud/Logo';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
	{
		className: 'border-sky-100 bg-sky-25/90 dark:border-sky-950 dark:bg-sky-a100/90',
		title: 'TubeOnAI',
		description: `TubeOnAI is an AI platform that summarizes and repurposes videos, podcasts, PDFs, and articles into clear, actionable content. As a Frontend Developer, I worked on the Next.js web app, building UI components, integrating APIs, and ensuring a smooth, responsive experience across devices.`,
		role: 'Frontend Developer',
		technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'React Query', 'React Hook Form', 'Zod', 'Firebase', 'React Modern Audio Player', 'Sentry'],
		link: 'https://web.tubeonai.com/',
		icon: <TubeOnAILogo className='h-full w-auto' />,
		image: 'https://tubeonai.com/wp-content/uploads/2025/02/Summaries-scaled.webp',
	},
	{
		className: 'border-indigo-100 bg-indigo-25/90 dark:border-indigo-950 dark:bg-indigo-a100/90',
		title: 'Templately',
		description: `Templately is a WordPress-based template cloud platform that empowers users and teams to build, share, and manage professional websites seamlessly. Here, I contributed to the Admin Panel, Landing App, WordPress Plugin, enterprise tools, and internal apps to enhance performance and UX.`,
		role: 'Frontend Developer & Plugin Developer',
		technologies: ['TypeScript', 'React.js', 'Next.js', 'Redux.js', 'GraphQL', 'Tailwind CSS', 'SASS', 'shadcn/ui', 'WordPress', 'Webpack', 'Vite', 'Vercel'],
		link: 'https://templately.com/',
		icon: <TemplatelyLogo className='h-full w-auto' />,
		image: 'https://blog.templately.com/wp-content/uploads/2023/07/image.jpeg',
	},
	{
		className: 'border-blue-100 bg-blue-25/90 dark:border-blue-950 dark:bg-blue-a100/90',
		title: 'xCloud',
		description: `xCloud is a scalable cloud-based hosting platform designed to manage, store, and process digital resources efficiently. It provides secure access, real-time operations, and performance-focused workflows. Here, I worked on the frontend architecture design with Vue.js and Tailwind CSS.`,
		role: 'Frontend Developer',
		technologies: ['Vue.js', 'Vite', 'Tailwind CSS', 'Axios', 'Lodash', 'Laravel'],
		link: 'https://app.xcloud.host/',
		icon: <XCloudLogo className='h-full w-auto' />,
		image: 'https://xcloud.host/wp-content/uploads/2025/08/Blog-_-Introducing-n8n-1-1024x576.jpg',
	},
	{
		className: 'border-green-100 bg-green-25/90 dark:border-green-950 dark:bg-green-a100/90',
		title: 'Betterdocs',
		description: `BetterDocs is a WordPress documentation and knowledge base plugin that helps teams create, organize, and present help content efficiently. It enhances self-service with instant search, structured categories, analytics, faq, chatbot, and clean layouts. I worked on re-architecting the admin panel, building the analytics dashboard, and developing the FAQ Builder.`,
		role: 'Plugin Developer',
		technologies: ['React.js', 'Draft.js', 'WordPress', 'QuickBuilder', 'React Query', 'Axios', 'Lodash', 'ApexCharts', 'Webpack'],
		link: 'https://betterdocs.co/',
		icon: <BetterdocsLogo className='h-full w-auto' />,
		image: 'https://betterdocs.co/wp-content/uploads/2025/09/image-5.png',
	},
	{
		className: 'border-cyan-100 bg-cyan-25/90 dark:border-cyan-950 dark:bg-cyan-a100/90',
		title: 'WpDeveloper Store',
		description: `All WPDeveloper users use this application to maintain their licenses and buy premium items. For all WPDeveloper users, this is the Dashboard app. This dashboard application is built with React.Js. As a front-end developer, I used Bootstrap and React.Js to create this dashboard.`,
		role: 'Frontend Developer',
		technologies: ['React.js', 'Redux.js', 'Bootstrap', 'ApexCharts', 'Axios', 'SCSS'],
		link: 'https://store.wpdeveloper.com/',
		icon: <WpDeveloperStoreLogo className='h-full w-auto' />,
		image: 'https://assets.wpdeveloper.com/2023/10/image.png',
	},
	{
		className: 'border-teal-100 bg-teal-25/90 dark:border-teal-950 dark:bg-teal-a100/90',
		title: 'NotificationX',
		description: `NotificationX is a WordPress marketing and social proof plugin that displays real-time notifications to boost conversions and engagement. It supports sales alerts, reviews, comments, and email signups. I worked on improving the admin experience, feature integration, and UI workflows for better usability.`,
		role: 'Plugin Developer',
		technologies: ['TypeScript', 'React.js', 'WordPress', 'ApexCharts', 'Draft.js', 'QuickBuilder', 'Lodash'],
		link: 'https://notificationx.com/',
		icon: <NotificationXLogo className='h-full w-auto' />,
		image: 'https://notificationx.com/wp-content/uploads/2025/09/image-16.png',
	},
	{
		className: 'border-violet-100 bg-violet-25/90 dark:border-violet-950 dark:bg-violet-a100/90',
		title: 'Easy.Jobs',
		description: `easy.jobs is an AI-powered recruitment and applicant tracking SaaS that helps businesses attract, evaluate, and hire top talent efficiently with customizable career sites, automated screening, and team collaboration tools. As the project's first front-end developer, I worked with Bootstrap, Vue.js, and Laravel.`,
		role: 'Frontend Developer',
		technologies: ['Vue.js', 'Bootstrap', 'jQuery', 'Laravel', 'Lodash', 'SCSS', 'Axios', 'ApexCharts'],
		link: 'https://app.easy.jobs/',
		icon: <EasyJobsLogo className='h-full w-auto' />,
		image: 'https://easy.jobs/wp-content/uploads/2024/11/image.jpeg',
	},
	{
		className: 'border-emerald-100 bg-emerald-25/90 dark:border-emerald-950 dark:bg-emerald-a100/90',
		title: 'SchedulePress',
		description: `SchedulePress is a WordPress editorial and scheduling plugin that helps teams plan, manage, and automate content publishing. It supports scheduled posts, missed schedule handling, and editorial workflows. I contributed by improving admin-side features, refining scheduling logic, and enhancing UI workflows for better usability.`,
		role: 'Frontend Developer',
		technologies: ['React.js', 'WordPress', 'WebPack', 'SCSS'],
		link: 'https://schedulepress.com/',
		icon: <SchedulePressLogo className='h-full w-auto' />,
		image: 'https://schedulepress.com/wp-content/uploads/2025/07/image-6.png',
	},
	{
		className: 'border-fuchsia-100 bg-fuchsia-25/90 dark:border-fuchsia-950 dark:bg-fuchsia-a100/90',
		title: 'BetterLinks',
		description: `BetterLinks is a WordPress link management and URL shortener plugin for creating, organizing, and tracking branded links with analytics. As the first Frontend Developer on the project, I set up the frontend foundation, built admin features, enhanced analytics views, and refined UI workflows.`,
		role: 'Frontend Developer',
		technologies: ['React.js', 'Redux.js', 'WordPress', 'ApexCharts', 'Axios', 'SCSS', 'MaterialUI', 'Formik', 'Gulp'],
		link: 'https://betterlinks.io/',
		icon: <BetterLinksLogo className='h-full w-auto' />,
		image: 'https://betterlinks.io/wp-content/uploads/2025/11/image-22.png',
	},
];
