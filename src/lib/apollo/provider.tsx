'use client';

import { createCache } from '@/lib/apollo/cache';
import { createClientLinks } from '@/lib/apollo/links';
import { ApolloClient, ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import { memo, type PropsWithChildren } from 'react';

export const makeClient = () =>
	new ApolloClient({
		cache: createCache(),
		link: createClientLinks(),
		dataMasking: true,
		devtools: { enabled: process.env.NODE_ENV === 'development' },
	});

const ApolloWrapper = memo(({ children }: PropsWithChildren) => <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>);

ApolloWrapper.displayName = 'ApolloWrapper';

export default ApolloWrapper;
