import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'schema.graphql',
	documents: ['src/**/*.{ts,tsx,graphql}', '!src/types/graphql/**'],
	generates: {
		'src/types/graphql/': {
			preset: 'client',
			presetConfig: {
				gqlTagName: 'gql',
			},
		},
	},
	ignoreNoDocuments: true,
};

export default config;
