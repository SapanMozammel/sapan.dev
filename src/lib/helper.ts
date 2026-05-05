type NavigatorWithUAData = Navigator & { userAgentData?: { platform: string } };

export const isAppleDevice = (): boolean => {
	if (typeof navigator === 'undefined') return false;
	const nav = navigator as NavigatorWithUAData;
	if (nav.userAgentData) return nav.userAgentData.platform === 'macOS';
	return /Mac/.test(navigator.userAgent);
};
