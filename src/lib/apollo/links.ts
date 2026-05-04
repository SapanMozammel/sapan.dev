import { env } from '@/lib/env';
import { ApolloLink, from } from '@apollo/client/link';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { HttpLink } from '@apollo/client/link/http';
import { RetryLink } from '@apollo/client/link/retry';

const getEndpoint = (): string => {
	const uri = env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
	if (!uri) {
		throw new Error('[apollo] NEXT_PUBLIC_GRAPHQL_ENDPOINT is not set. Set it before firing any GraphQL operation. See .env.example.');
	}
	return uri;
};

const createRetryLink = (): RetryLink =>
	new RetryLink({
		delay: { initial: 300, max: 3000, jitter: true },
		attempts: { max: 3 },
	});

const createErrorLink = (): ErrorLink =>
	new ErrorLink(({ error, operation }) => {
		if (process.env.NODE_ENV !== 'development') return;
		const opName = operation.operationName ?? '<anonymous>';
		console.error(`[apollo] error on operation "${opName}":`, error);
	});

const createHttpLink = (): HttpLink => new HttpLink({ uri: getEndpoint });

const createServerAuthLink = (token: string | undefined): SetContextLink =>
	new SetContextLink((prevContext) => {
		if (!token) return {};
		const prevHeaders = (prevContext.headers ?? {}) as Record<string, string>;
		return { headers: { ...prevHeaders, authorization: `Bearer ${token}` } };
	});

export const createServerLinks = (token: string | undefined): ApolloLink => from([createRetryLink(), createErrorLink(), createServerAuthLink(token), createHttpLink()]);

export const createClientLinks = (): ApolloLink => from([createRetryLink(), createErrorLink(), createHttpLink()]);
