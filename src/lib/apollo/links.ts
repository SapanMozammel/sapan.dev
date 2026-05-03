import { ApolloLink, from } from '@apollo/client/link';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { HttpLink } from '@apollo/client/link/http';
import { RetryLink } from '@apollo/client/link/retry';

const ENDPOINT_ENV = 'NEXT_PUBLIC_GRAPHQL_ENDPOINT';
const TOKEN_ENV = 'GRAPHQL_AUTH_TOKEN';

const getEndpoint = (): string => {
	const uri = process.env[ENDPOINT_ENV];
	if (!uri) {
		throw new Error(`[apollo] ${ENDPOINT_ENV} is not set. Set it before firing any GraphQL operation. See .env.example.`);
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

const createServerAuthLink = (): SetContextLink =>
	new SetContextLink((prevContext) => {
		const token = process.env[TOKEN_ENV];
		if (!token) return {};
		const prevHeaders = (prevContext.headers ?? {}) as Record<string, string>;
		return { headers: { ...prevHeaders, authorization: `Bearer ${token}` } };
	});

export const createServerLinks = (): ApolloLink => from([createRetryLink(), createErrorLink(), createServerAuthLink(), createHttpLink()]);

export const createClientLinks = (): ApolloLink => from([createRetryLink(), createErrorLink(), createHttpLink()]);
