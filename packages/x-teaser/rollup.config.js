import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const input = 'src/Teaser.tsx';

const plugins = [
	typescript(),
	resolve(),
	commonJS()
];

const external = [
	'dateformat',
	'@financial-times/x-engine'
];

export default [
	{
		input,
		plugins,
		external,
		output: {
			file: pkg.main,
			format: 'cjs'
		}
	},
	{
		input,
		plugins,
		external,
		output: {
			file: pkg.module,
			format: 'es'
		}
	}
];
