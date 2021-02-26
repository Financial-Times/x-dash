const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const postcss = require('rollup-plugin-postcss')
const postcssConfig = require('./postcss-config')
const babelConfig = require('./babel-config')

module.exports = ({ input, pkg }) => {
	// Don't bundle any dependencies
	const external = Object.keys(pkg.dependencies)

	const pluginsPreBabel = [
		// Convert CommonJS modules to ESM so they can be included in the bundle
		// commonjs({ extensions: ['.js', '.jsx'] })
	]

	const pluginsPostBabel = [commonjs({ extensions: ['.js', '.jsx'] })]

	// Add support for CSS modules (and any required transpilation)
	if (pkg.style) {
		const config = postcssConfig(pkg.style)
		pluginsPostBabel.push(postcss(config))
	}

	// Pairs of input and output options
	return [
		[
			{
				input,
				external,
				plugins: [
					...pluginsPreBabel,
					babel(
						babelConfig({
							targets: { node: '12' }
						})
					),
					...pluginsPostBabel
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
					...pluginsPreBabel,
					babel(
						babelConfig({
							targets: { node: '12' }
						})
					),
					...pluginsPostBabel
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
					...pluginsPreBabel,
					babel(
						babelConfig({
							targets: { ie: '11' }
						})
					),
					...pluginsPostBabel
				]
			},
			{
				file: pkg.browser,
				format: 'cjs'
			}
		]
	]
}
