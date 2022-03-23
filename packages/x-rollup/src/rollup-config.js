const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const babelConfig = require('./babel-config')

module.exports = ({ input, pkg }) => {
	// Don't bundle any dependencies
	const external = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies || {})]

	const plugins = [
		// Convert CommonJS modules to ESM so they can be included in the bundle
		commonjs({ extensions: ['.js', '.jsx'] })
	]

	// Pairs of input and output options
	return [
		[
			{
				input,
				external,
				plugins: [
					babel(
						babelConfig({
							targets: { node: '12' }
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
							targets: { node: '12' }
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
							targets: { ie: '11' }
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
