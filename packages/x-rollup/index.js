const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');

const bubleOptions = {
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

	return [
		{
			input,
			output: {
				file: pkg.module,
				format: 'es'
			},
			external,
			plugins: [buble({ ...bubleOptions, target: { node: 6 } }), commonPlugin]
		},
		{
			input,
			output: {
				file: pkg.main,
				format: 'cjs'
			},
			external,
			plugins: [buble({ ...bubleOptions, target: { node: 6 } }), commonPlugin]
		},
		{
			input,
			output: {
				file: pkg.browser,
				format: 'cjs'
			},
			external,
			plugins: [buble({ ...bubleOptions, target: { ie: 11 } }), commonPlugin]
		}
	];
};

module.exports.bubleOptions = bubleOptions;
