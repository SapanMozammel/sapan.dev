const nextConfig = require('eslint-config-next/core-web-vitals');
const prettierConfig = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

// Prettier options from .formatter/.prettierrc.js (strip Prettier-only keys not valid in ESLint rule)
const { plugins: _p, overrides: _o, ...prettierOptions } = require('./.formatter/.prettierrc.js');

module.exports = [
	// Next.js core-web-vitals flat config (includes React, React Hooks, import, a11y, @next rules)
	...Object.values(nextConfig),

	// TypeScript + Prettier layer
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			prettier: prettierPlugin,
			'@typescript-eslint': typescriptPlugin,
		},
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				ecmaVersion: 2022,
				sourceType: 'module',
				project: './tsconfig.json',
			},
		},
		rules: {
			// Prettier — reads options from .formatter/.prettierrc.js
			'prettier/prettier': ['error', prettierOptions],

			// Code quality
			'max-len': ['error', {
				code: 220,
				ignoreUrls: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreComments: true,
			}],
			'no-console': 'warn',
			'no-debugger': 'error',
			'prefer-const': 'error',
			'no-var': 'error',
			'eqeqeq': ['error', 'always'],
			'curly': ['error', 'all'],

			// React
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/jsx-key': 'error',
			'react/jsx-no-duplicate-props': 'error',
			'react/jsx-no-undef': 'error',
			'react/jsx-no-target-blank': 'error',
			'react/no-unused-state': 'warn',
			'react/self-closing-comp': 'error',
			'react/no-unescaped-entities': 'off',

			// React Hooks
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			// React Compiler rules (react-hooks v7) — project does not use React Compiler
			'react-hooks/immutability': 'off',
			'react-hooks/set-state-in-effect': 'off',
			'react-hooks/refs': 'off',
			'react-hooks/preserve-manual-memoization': 'off',

			// Import
			'no-duplicate-imports': 'error',
			'import/no-unresolved': 'off',

			// Next.js
			'@next/next/no-html-link-for-pages': 'error',
			'@next/next/no-img-element': 'warn',

			// Best practices
			'no-eval': 'error',
			'no-implied-eval': 'error',
			'no-new-func': 'error',
			'no-script-url': 'error',
			'no-alert': 'warn',
			'object-shorthand': 'error',
			'prefer-template': 'error',

			// Disable conflicting prettier rules
			...prettierConfig.rules,
		},
	},

	// JS files — no typed linting
	{
		files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
		plugins: { prettier: prettierPlugin },
		rules: {
			'prettier/prettier': ['error'],
			'no-console': 'warn',
			'prefer-const': 'error',
			'no-var': 'error',
		},
	},

	// Ignores
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'out/**',
			'build/**',
			'dist/**',
			'**/*.min.js',
			'**/*.min.css',
			'coverage/**',
			'.cache/**',
			'public/**',
		],
	},
];