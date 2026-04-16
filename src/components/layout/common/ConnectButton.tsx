'use client';

import { Button } from '@/components/layout/common/Button';
import { useAppDispatch } from '@/store/hooks';
import { openContactModal } from '@/store/slices/uiSlice';
import { ConnectButtonProps } from '@/types/button';
import { useTranslations } from 'next-intl';
import { memo, useCallback } from 'react';

const ConnectButton = memo<ConnectButtonProps>(({ className, gradient = false, fill = true }) => {
	const translateButtons = useTranslations('common.buttons');
	const dispatch = useAppDispatch();

	const handleOpen = useCallback(() => {
		dispatch(openContactModal());
	}, [dispatch]);

	return (
		<Button fill={fill} gradient={gradient} className={className} onClick={handleOpen}>
			{translateButtons('letsConnect')}
		</Button>
	);
});

ConnectButton.displayName = 'ConnectButton';

export default ConnectButton;
