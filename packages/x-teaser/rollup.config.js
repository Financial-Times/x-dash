import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
	input: 'src/Teaser.tsx',
	external: [
		'dateformat',
		'@financial-times/x-engine'
	],
	output: {
		file: pkg.main,
		format: 'cjs'
	},
	plugins: [
		typescript({ tsconfig: './tsconfig.json' }),
		resolve({ jsnext: true }),
		commonJS()
	]
};
