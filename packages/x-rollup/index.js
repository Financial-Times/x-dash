const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');

const bubleOptions = {
	include: '**/*.{js,jsx}',
	objectAssign: 'Object.assign',
	jsx: 'h',
	transforms: {
		parameterDestructuring: true, // required for object rest to work in params
	},
};

module.exports = ({input, pkg, external: extraExternal = []}) => {
	const external = [
		'@financial-times/x-engine',
		...extraExternal,
	];

	const commonPlugin = commonjs({ extensions: ['.js', '.jsx'] });
	const postcssPlugin = pkg.style && postcss({
		extract: pkg.style,
		modules: true,
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
				buble({
					...bubleOptions,
					target: { node: 6 },
				}),
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
				buble({
					...bubleOptions,
					target: { node: 6 },
				}),
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
				buble({
					...bubleOptions,
					target: { ie: 11 },
				}),
				postcssPlugin,
				commonPlugin,
			].filter(Boolean),
		}
	];
};

module.exports.bubleOptions = bubleOptions;
