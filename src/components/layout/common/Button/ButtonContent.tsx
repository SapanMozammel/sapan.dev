'use client';

import type { ButtonContentProps } from '@/types/button';
import { IconLoader } from '@tabler/icons-react';
import { memo } from 'react';

export const ButtonContent = memo<ButtonContentProps>(({ children, loading, textClassName }) => (
	<span className={textClassName}>
		{loading ? (
			<>
				<IconLoader className='h-5 w-5 animate-spin' /> loading...
			</>
		) : (
			children
		)}
	</span>
));

ButtonContent.displayName = 'ButtonContent';
