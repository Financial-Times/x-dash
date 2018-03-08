import {Component, HyperscriptConfig, HyperscriptMode, HyperscriptOptions, FileMap, Host} from '../types';
import {transform} from 'babel-core';
import * as fs from 'fs-extra';
import * as path from 'path';
import globby = require('globby');
import mapToObject from '../map-to-object';
import promiseAllObject from '../promise-all-object';
import paramCase = require('param-case');

const modeOptions: {[mode in HyperscriptMode]: HyperscriptOptions} = {
	react: {
		pragma: 'React.createElement',
		import: 'react'
	},
	preact: {
		pragma: 'Preact.h',
		import: 'preact'
	},
	vhtml: {
		pragma: 'h',
		import: 'vhtml'
	},
};

const getPragmaBinding = (pragma: string) => pragma.replace(/^(.+?)(\..+)?$/, '$1');

function transformJSXToHyperscript(src: string, options: HyperscriptOptions): string {
	const {code} = transform(src, {
		presets: [
			[require('babel-preset-env'), {
				targets: { node: 'current' }
			}]
		],
		plugins: [
			[require('babel-plugin-transform-react-jsx'), {pragma: options.pragma}],
			require('babel-plugin-syntax-jsx'),
			require('babel-plugin-add-module-exports'),
			[require('@financial-times/babel-plugin-jsx-import').default, {
				binding: getPragmaBinding(options.pragma),
				import: options.import,
			}]
		],
	});

	return code || '';
}

export default async function babel(component: Component, config: HyperscriptConfig, host?: Host): Promise<{
	[target: string]: FileMap
}> {
	const root = await fs.realpath(
		component.root
	);

	const files = await globby(
		path.join(
			root,
			'dist/jsx',
			'**/*.{js,jsx}'
		)
	);

	const options = config.options || modeOptions[config.mode];

	if(host != null) {
		options.import = path.resolve(
			host.root,
			'node_modules',
			options.import
		);
	}

	const targetDir = path.join(
		'hyperscript',
		paramCase(options.pragma)
	);

	const outDir = path.resolve(
		root,
		'dist',
		targetDir
	);

	await fs.ensureDir(outDir);

	const realFiles = await Promise.all(
		files.map(file => fs.realpath(file))
	);

	return {[targetDir]: await promiseAllObject(
		mapToObject(
			realFiles,
			async file => {
				const code = transformJSXToHyperscript(
					await fs.readFile(file, 'utf8'),
					options
				);

				const fileBase = path.relative(
					path.join(
						root,
						'dist/jsx'
					),
					file
				).replace(/\.jsx$/, '.js');

				const outFile = path.resolve(outDir, fileBase);
				await fs.writeFile(outFile, code);

				return outFile;
			}
		)
	)};
};
