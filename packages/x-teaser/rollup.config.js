import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
	input: 'src/Teaser.tsx',
	external: [
		'dateformat'
	],
	output: {
		file: pkg.main,
		intro: 'module.exports = function (h) {',
		outro: 'return exports; };',
		format: 'cjs'
	},
	plugins: [
		typescript({ tsconfig: './tsconfig.json' }),
		resolve({ jsnext: true }),
		commonJS()
	]
};
