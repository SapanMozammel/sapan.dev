// Factory, not a singleton — server and browser need separate cache instances or hydration corrupts.
import { InMemoryCache } from '@apollo/client-integration-nextjs';

export const createCache = (): InMemoryCache =>
	new InMemoryCache({
		typePolicies: {},
	});
