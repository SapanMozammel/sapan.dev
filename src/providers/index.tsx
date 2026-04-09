'use client';

import { store } from '@/store';
import type { ProvidersProps } from '@/types/providers';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { memo } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

// Move static theme provider props outside component to prevent recreation
const THEME_PROVIDER_PROPS = {
	enableSystem: true,
	defaultTheme: 'system' as const,
	enableColorScheme: false,
	themes: ['light', 'dark', 'system'],
	attribute: 'class' as const,
};

const Providers = memo(({ children }: ProvidersProps) => (
	<ReduxProvider store={store}>
		<NextThemesProvider {...THEME_PROVIDER_PROPS}>{children}</NextThemesProvider>
	</ReduxProvider>
));

Providers.displayName = 'Providers';

export default Providers;
