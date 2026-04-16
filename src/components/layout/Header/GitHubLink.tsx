'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IconBrandGithub } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import NextLink from 'next/link';

const GitHubLink = () => {
	const translateLabels = useTranslations('common.labels');

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<NextLink
					href='https://github.com/SapanMozammel'
					target='_blank'
					className='hover:text-primary dark:hover:text-success text-dark hidden aspect-square h-6 cursor-pointer items-center justify-center ease-in-out sm:h-8 md:inline-flex dark:text-white'
				>
					<IconBrandGithub className='h-4 w-4 outline-none sm:h-5 sm:w-5' />
				</NextLink>
			</TooltipTrigger>
			<TooltipContent side='bottom'>
				<p className='font-hg'>{translateLabels('viewOnGithub')}</p>
			</TooltipContent>
		</Tooltip>
	);
};

GitHubLink.displayName = 'GitHubLink';

export default GitHubLink;
