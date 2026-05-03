import { createCache } from '@/lib/apollo/cache';
import { createServerLinks } from '@/lib/apollo/links';
import { ApolloClient, registerApolloClient } from '@apollo/client-integration-nextjs';

const { getClient, query, PreloadQuery } = registerApolloClient(
	() =>
		new ApolloClient({
			cache: createCache(),
			link: createServerLinks(),
			dataMasking: true,
		})
);

export { getClient, PreloadQuery, query };
