module.exports = {
	root: true,
	extends: './eslint-config/index.js',
	env: { es2022: true },
	rules: {
		'new-cap': [
			'error',
			{
				capIsNewExceptions: [
					'Router', // http://expressjs.com/en/api.html#router
					'Metadata', // https://github.com/deeplay-io/nice-grpc/tree/master/packages/nice-grpc#metadata-1
				],
			},
		],
		// TODO discuss if this needs to be always warn
		'no-warning-comments': 'off',
	},
	overrides: [
		{
			files: ['*.test.{tsx,ts,js}'],
			extends: ['./eslint-config/jest.js'],
			env: { 'jest/globals': true },
			settings: { jest: { version: 28 } },
		},
		{
			files: ['jest.config.js', '.eslintrc.js', 'babel.config.js', 'webpack*.js', './eslint-config/*'],
			env: { node: true },
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
		{
			files: ['client/**/*'],
			extends: ['./eslint-config/react.js'],
			globals: { process: 'readonly' },
			settings: { react: { version: 'detect' } },
			env: { browser: true, commonjs: true },
			rules: {
				// custom rules for react codebase
				'no-restricted-syntax': [
					'warn',
					{
						selector: "MemberExpression[object.name='window'][property.name='debug']",
						message: 'window.debug only available in development env for testing. Remove before commiting.',
					},
				],
				// Here is an example of some custom rules
				// '@typescript-eslint/no-restricted-imports': [
				// 	'warn',
				// 	{
				// 		paths: [
				// 			{
				//				// Don't use old components (from /react-md/* location):
				// 				name: 'react-md',
				// 				message: 'Please use material-ui components from @/new-components instead.',
				// 			},
				// 			{
				//				// Don't use some specific old components (from /components/* location):
				// 				name: '@/components',
				// 				importNames: ['MenuButton', 'NumberField', 'TextField'],
				// 				message: 'Please use material-ui components from @/new-components instead.',
				// 			},
				// 		],
				// 	},
				// ],
				'react-hooks/exhaustive-deps': ['error', { additionalHooks: 'useOnce' }],
				// temporally disabled for incremental adoption
				// <10
				'no-promise-executor-return': 'warn',
				// >10
				'@typescript-eslint/no-empty-function': 'warn',
				// >100
				'new-cap': 'off',
				'@typescript-eslint/ban-ts-comment': 'off',
				'@typescript-eslint/no-non-null-assertion': 'off',
				// >1000
				'@typescript-eslint/no-explicit-any': 'off',
			},
		},
		{
			files: ['server/**/*'],
			env: { node: true },
			rules: {
				// <10
				'@typescript-eslint/no-empty-function': 'warn',
				'@typescript-eslint/no-invalid-this': 'warn',
				'@typescript-eslint/no-non-null-assertion': 'warn',
				'@typescript-eslint/no-unused-expressions': 'warn',
				'@typescript-eslint/prefer-ts-expect-error': 'warn',
				'array-callback-return': 'warn',
				'no-duplicate-imports': 'warn',
				'no-lone-blocks': 'warn',
				'no-new': 'warn',
				'no-promise-executor-return': 'warn',
				'no-useless-call': 'warn',
				'no-useless-computed-key': 'warn',
				'no-useless-return': 'warn',
				'prefer-object-spread': 'warn',
				// >10
				'@typescript-eslint/ban-ts-comment': 'warn',
				'@typescript-eslint/no-unused-vars': 'warn',
				'@typescript-eslint/no-use-before-define': 'warn',
				'no-console': 'warn',
				'object-shorthand': 'warn',
				eqeqeq: 'warn',
				// >100
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-var-requires': 'off',
				'new-cap': 'off',
			},
		},
	],
};
