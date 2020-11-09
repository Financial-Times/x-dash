const babel = require('rollup-plugin-babel')
const postcss = require('rollup-plugin-postcss')
const commonjs = require('rollup-plugin-commonjs')
const postcssConfig = require('./postcss-config')
const babelConfig = require('./babel-config')

module.exports = ({ input, pkg }) => {
	// Don't bundle any dependencies
	const external = Object.keys(pkg.dependencies)

	const plugins = [
		// Convert CommonJS modules to ESM so they can be included in the bundle
		commonjs({ extensions: ['.js', '.jsx'] })
	]

	// Add support for CSS modules (and any required transpilation)
	if (pkg.style) {
		const config = postcssConfig(pkg.style)
		plugins.push(postcss(config))
	}

	// Pairs of input and output options
	return [
		[
			{
				input,
				external,
				plugins: [
					babel(
						babelConfig({
							targets: [{ node: 12 }]
						})
					),
					...plugins
				]
			},
			{
				file: pkg.module,
				format: 'es'
			}
		],
		[
			{
				input,
				external,
				plugins: [
					babel(
						babelConfig({
							targets: [{ node: 12 }]
						})
					),
					...plugins
				]
			},
			{
				file: pkg.main,
				format: 'cjs'
			}
		],
		[
			{
				input,
				external,
				plugins: [
					babel(
						babelConfig({
							targets: [{ browsers: ['ie 11'] }]
						})
					),
					...plugins
				]
			},
			{
				file: pkg.browser,
				format: 'cjs'
			}
		]
	]
}
