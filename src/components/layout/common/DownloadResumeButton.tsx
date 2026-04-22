'use client';

import { Button } from '@/components/layout/common/Button';
import { ConnectButtonProps } from '@/types/button';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

const RESUME_PATH = '/resume/Sapan-Mozammel-Frontend-Developer-resume-3.pdf';
const RESUME_FILENAME = 'Sapan-Mozammel-Frontend-Developer.pdf';

const DownloadResumeButton = memo<ConnectButtonProps>(({ className, gradient = false, fill = true }) => {
	const translateButtons = useTranslations('common.buttons');

	return (
		<Button fill={fill} gradient={gradient} className={className} to={RESUME_PATH} download={RESUME_FILENAME}>
			{translateButtons('downloadResume')}
		</Button>
	);
});

DownloadResumeButton.displayName = 'DownloadResumeButton';

export default DownloadResumeButton;
