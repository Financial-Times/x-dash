import {Component, HyperscriptConfig, FileMap} from '../types';
import {transform} from 'babel-core';
import * as fs from 'fs-extra';
import * as path from 'path';
import globby = require('globby');

function transformJSXToHyperscript(src: string, pragma: string): string {
	const {code} = transform(src, {
		presets: [
			['react', {pragma}],
			['env', {
				targets: { node: 'current' }
			}]
		]
	});

	return code || '';
}

export default async function babel(component: Component, {pragma}: HyperscriptConfig): Promise<FileMap> {
	const files = await globby(
		path.join(
			component.root,
			'dist/jsx',
			'**/*.js'
		)
	);

	const results = await Promise.all(
		files.map(
			async file => transformJSXToHyperscript(
				await fs.readFile(file, 'utf8'),
				pragma
			)
		)
	);

	console.log(results);

	return {};
}
