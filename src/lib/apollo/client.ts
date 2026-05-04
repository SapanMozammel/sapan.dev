import { createCache } from '@/lib/apollo/cache';
import { createServerLinks } from '@/lib/apollo/links';
import { env } from '@/lib/env.server';
import { ApolloClient, registerApolloClient } from '@apollo/client-integration-nextjs';

const { getClient, query, PreloadQuery } = registerApolloClient(
	() =>
		new ApolloClient({
			cache: createCache(),
			link: createServerLinks(env.GRAPHQL_AUTH_TOKEN),
			dataMasking: true,
		})
);

export { getClient, PreloadQuery, query };
