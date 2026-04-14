'use client';

import StatusDot from '@/components/ui/status-dot';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IconBrandGithub, IconBrandLinkedin, IconBrandWordpress, IconMailFilled, IconMapPinFilled, IconPhoneFilled } from '@tabler/icons-react';
import NextLink from 'next/link';
import { memo } from 'react';

const SOCIAL_LINKS = [
	{ label: 'GitHub', href: 'https://github.com/SapanMozammel', icon: IconBrandGithub },
	{ label: 'LinkedIn', href: 'https://linkedin.com/in/sapanmozammel/', icon: IconBrandLinkedin },
	{ label: 'WordPress', href: 'https://profiles.wordpress.org/sapanmozammel/', icon: IconBrandWordpress },
] as const;

const CtaConnect = memo(() => (
	<div className='flex flex-col gap-4'>
		{/* Availability */}
		<div className='flex items-center gap-3 pl-0.5'>
			<StatusDot />
			<span className='text-primary dark:text-success text-paragraph-small'>Ready for your next project</span>
		</div>
		{/* Location & Contact */}
		<div className='font-hg flex flex-col gap-2.5'>
			<p className='text-secondary-600 dark:text-secondary-400 text-paragraph-small flex items-center gap-2.5'>
				<IconMapPinFilled className='text-primary dark:text-success h-4 w-4 shrink-0' />
				Based in Dhaka, Bangladesh. Shipping globally.
			</p>
			<NextLink
				href='mailto:sapanmozammel@gmail.com'
				className='text-secondary-600 hover:text-primary dark:text-secondary-400 dark:hover:text-success text-paragraph-small inline-flex items-center gap-2.5 transition-colors'
			>
				<IconMailFilled className='text-primary dark:text-success h-4 w-4 shrink-0' />
				sapanmozammel@gmail.com
			</NextLink>
			<NextLink href='tel:+8801627134085' className='text-secondary-600 hover:text-primary dark:text-secondary-400 dark:hover:text-success text-paragraph-small inline-flex items-center gap-2.5 transition-colors'>
				<IconPhoneFilled className='text-primary dark:text-success h-4 w-4 shrink-0' />
				+88 01627134085
			</NextLink>
		</div>

		{/* Social icons with tooltips */}
		<div className='mt-2.5 flex items-center gap-3'>
			{SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
				<Tooltip key={label}>
					<TooltipTrigger asChild>
						<NextLink
							href={href}
							target='_blank'
							rel='noopener noreferrer'
							aria-label={label}
							className='group bg-light hover:bg-primary dark:hover:bg-success flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg dark:bg-slate-900'
						>
							<Icon className='text-secondary-600 dark:text-secondary-400 dark:group-hover:text-dark h-4.5 w-4.5 transition-colors duration-300 group-hover:text-white' stroke={2} />
						</NextLink>
					</TooltipTrigger>
					<TooltipContent side='bottom'>{label}</TooltipContent>
				</Tooltip>
			))}
		</div>
	</div>
));

CtaConnect.displayName = 'CtaConnect';

export default CtaConnect;
