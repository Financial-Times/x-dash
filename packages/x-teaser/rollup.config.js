import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

const input = 'src/Teaser.jsx';

const external = [
	'@financial-times/x-engine',
	'dateformat'
];

const bubleOptions = {
	objectAssign: 'Object.assign',
	jsx: 'h',
	transforms: {
		parameterDestructuring: true, // required for object rest to work in params
	},
};

const commonPlugin = commonjs({ extensions: ['.js', '.jsx'] });

export default [
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
