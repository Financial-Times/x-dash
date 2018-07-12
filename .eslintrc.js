const config = require('./lerna.json');

module.exports = {
	env: {
		node: true,
		browser: true,
		commonjs: true,
		es6: true
	},
	extends: [
		'eslint:recommended',
		'plugin:jest/recommended',
		'plugin:react/recommended'
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	rules: {
		'react/prop-types': 'off',
		'react/display-name': 'off'
	},
	overrides: [
		{
			// components interact with x-engine rather than React runtime
			files: [ 'components/**/*.jsx' ],
			settings: {
				react: {
					pragma: 'h'
				}
			},
			rules: {
				'react/react-in-jsx-scope': 'off',
				'react/prefer-stateless-function': 'error'
			}
		}
	]
};
