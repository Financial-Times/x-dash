// This configuration extends the existing Storybook Webpack config.
// See https://storybook.js.org/configurations/custom-webpack-config/ for more info.

const path = require('path')
const glob = require('glob')
const fs = require('fs')
const xBabelConfig = require('../packages/x-babel-config')
const xEngine = require('../packages/x-engine/src/webpack')
const WritePlugin = require('write-file-webpack-plugin')

const excludePaths = [/node_modules/, /dist/]

module.exports = ({ config }) => {
	// HACK: extend existing JS rule to ensure all dependencies are correctly ignored
	// from Babel transpilation.
	// https://github.com/storybooks/storybook/issues/3346#issuecomment-459439438
	const jsRule = config.module.rules.find((rule) => rule.test.test('.jsx'))
	jsRule.exclude = excludePaths

	// HACK: Instruct Babel to check module type before injecting Core JS polyfills
	// https://github.com/i-like-robots/broken-webpack-bundle-test-case
	const babelConfig = jsRule.use.find(({ loader }) => loader === 'babel-loader') || {
		options: { presets: [] }
	}
	babelConfig.options.sourceType = 'unambiguous'

	// Override the Babel configuration for all x- components with our own
	babelConfig.options.overrides = [
		{
			test: /\/components\/x-[^\/]+\/src\//,
			...xBabelConfig()
		}
	]

	// HACK: there is a bug in babel-plugin-minify-simplify which cannot
	// handle how Babel transpiles restful destructing assignment so remove it.
	// e.g. const { foo, ...qux } = { foo: 0, bar: 1, baz: 2 }
	babelConfig.options.presets = babelConfig.options.presets.filter((preset) => {
		const name = Array.isArray(preset) ? preset[0] : preset
		return name.includes('babel-preset-minify') === false
	})

	config.module.rules.push({
		test: /\.(scss|sass)$/,
		use: [
			{
				loader: require.resolve('style-loader')
			},
			{
				loader: require.resolve('css-loader'),
				options: {
					url: false,
					import: false
				}
			},
			{
				loader: require.resolve('sass-loader'),
				options: {
					sassOptions: {
						includePaths: glob.sync('./components/*/node_modules', { absolute: true })
					}
				}
			}
		]
	})

	// HACK: Ensure we only bundle one instance of React
	config.resolve.alias.react = require.resolve('react')

	config.plugins.push(xEngine(), new WritePlugin())

	return config
}
