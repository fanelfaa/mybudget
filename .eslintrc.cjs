module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		'airbnb-base',
		'plugin:prettier/recommended',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	plugins: ['react-refresh'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				trailingComma: 'es5',
				arrowParens: 'always',
				useTabs: true,
				semi: true,
				endOfLine: 'auto',
			},
		],
		'import/prefer-default-export': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/no-unresolved': 'off',
		'import/extensions': 'off',
		'prefer-destructuring': 'off',
		'no-shadow': 'off',
		'no-mixed-spaces-and-tabs': 'off',
	},
};
