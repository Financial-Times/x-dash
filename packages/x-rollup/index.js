const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const path = require('path');

const babelOptions = (targets) => ({
	include: '**/*.{js,jsx}',
	plugins: [
		[require.resolve('babel-plugin-transform-react-jsx'), {
			pragma: 'h'
		}],
		[require.resolve('babel-plugin-transform-object-rest-spread'), {
			// although this is stage 4, we'd have to use babel 7 to get the version
			// of preset-env that supports it :/
			useBuiltIns: true
		}],
		require.resolve('babel-plugin-external-helpers'),
		require.resolve('fast-async'),
	],
	presets: targets && [
		[require.resolve('babel-preset-env'), {
			targets,
			modules: false,
			exclude: ['transform-regenerator', 'transform-async-to-generator'],
		}],
	],
});

module.exports = ({input, pkg, external: extraExternal = []}) => {
	const external = [
		'@financial-times/x-engine',
		...extraExternal,
	];

	const commonPlugin = commonjs({ extensions: ['.js', '.jsx'] });
	const postcssPlugin = pkg.style && postcss({
		extract: pkg.style,
		modules: true,
		use: [
			['sass', {
				includePaths: [path.resolve(process.cwd(), 'bower_components')]
			}],
			'stylus',
			'less',
		],
	});

	return [
		{
			input,
			output: {
				file: pkg.module,
				format: 'es'
			},
			external,
			plugins: [
				babel(babelOptions({ node: 6 })),
				postcssPlugin,
				commonPlugin
			].filter(Boolean),
		},
		{
			input,
			output: {
				file: pkg.main,
				format: 'cjs'
			},
			external,
			plugins: [
				babel(babelOptions({ node: 6 })),
				postcssPlugin,
				commonPlugin,
			].filter(Boolean),
		},
		{
			input,
			output: {
				file: pkg.browser,
				format: 'cjs'
			},
			external,
			plugins: [
				babel(babelOptions({ browsers: ['ie 11'] })),
				postcssPlugin,
				commonPlugin,
			].filter(Boolean),
		}
	];
};

module.exports.babelOptions = babelOptions;
