module.exports = (targets = []) => ({
	include: '**/*.{js,jsx}',
	plugins: [
		// this plugin is not React specific! It includes a general JSX parser and helper 🙄
		[
			require.resolve('babel-plugin-transform-react-jsx'),
			{
				pragma: 'h',
				useBuiltIns: true
			}
		],
		// Although this feature is at stage 4, we'd have to use babel 7 to get the version
		// of preset-env that actually supports it 😖
		[
			require.resolve('babel-plugin-transform-object-rest-spread'),
			{
				useBuiltIns: true
			}
		],
		// Instruct Babel to not include any internal helper declarations in the output
		require.resolve('babel-plugin-external-helpers'),
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
			require.resolve('babel-preset-env'),
			{
				targets,
				modules: false,
				exclude: ['transform-regenerator', 'transform-async-to-generator']
			}
		]
	]
});
