module.exports = ({ targets = [], modules = false } = {}) => ({
	plugins: [
		// this plugin is not React specific! It includes a general JSX parser and helper 🙄
		[
			require.resolve('@babel/plugin-transform-react-jsx'),
			{
				pragma: 'h',
				useBuiltIns: true
			}
		],
		// Implements async/await using syntax transformation rather than generators which require
		// a huge runtime for browsers which do not natively support them.
		[
			require.resolve('fast-async'),
			{
				compiler: {
					noRuntime: true
				}
			}
		]
	],
	presets: [
		[
			require.resolve('@babel/preset-env'),
			{
				targets,
				modules,
				exclude: ['transform-regenerator', 'transform-async-to-generator']
			}
		]
	]
})
