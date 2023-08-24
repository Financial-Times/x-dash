module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['jsx-a11y'],
	extends: [
		'@financial-times/eslint-config-next',
		'plugin:jest/recommended',
		'plugin:react/recommended',
		'plugin:jsx-a11y/recommended',
		'@dotcom-reliability-kit/eslint-config',
		'prettier'
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		}
	},
	settings: {
		react: {
			version: '16.8'
		}
	},
	rules: {
		// We don't expect consumers of x-dash to use prop types
		'react/prop-types': 'off',
		// We don't use display names for SFCs
		'react/display-name': 'off',
		// This rule is intended to catch < or > but it's too eager
		'react/no-unescaped-entities': 'off',
		// this rule is deprecated and replaced with label-has-associated-control
		'jsx-a11y/label-has-for': 'off',
		'jsx-a11y/label-has-associated-control': 'error'
	},
	overrides: [
		{
			// Components in x-dash interact with x-engine rather than React
			files: ['components/*/src/**/*.jsx', 'components/*/__tests__/**/*.jsx'],
			settings: {
				react: {
					pragma: 'h',
					createClass: 'Component'
				}
			},
			rules: {
				'react/prefer-stateless-function': 'error'
			}
		},
		{
			files: ['*.js', '*.jsx'],
			rules: {
				// We are still using CommonJS imports in our JS files
				'@typescript-eslint/no-var-requires': 'off'
			}
		},
		{
			files: [
				'components/**/__tests__/*.js',
				'components/**/__tests__/*.jsx',
				'components/**/storybook/*.jsx'
			],
			rules: {
				// We are still using CommonJS imports in our JS files
				'@typescript-eslint/no-empty-function': 'off'
			}
		}
	]
}
