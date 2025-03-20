// This configuration extends the existing Storybook Webpack config.
// See https://storybook.js.org/configurations/custom-webpack-config/ for more info.

const glob = require('glob')
const xEngine = require('../packages/x-engine/src/webpack')
const WritePlugin = require('write-file-webpack-plugin')

module.exports = ({ config }) => {
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
					import: false,
					importLoaders: 2
				}
			},
			{
				loader: require.resolve('postcss-loader'),
				options: {
					postcssOptions: {
						plugins: [[require.resolve('postcss-import')]]
					}
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

	config.plugins.push(xEngine(), new WritePlugin())

	return config
}
