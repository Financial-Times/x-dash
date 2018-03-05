import {FilePath, HyperscriptConfig} from '../types';
import {transform} from 'babel-core';
import * as fs from 'mz/fs';

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

export default async function babel(files: FilePath[], {pragma}: HyperscriptConfig) {
	const results = await Promise.all(
		files.map(
			async file => transformJSXToHyperscript(
				await fs.readFile(file, 'utf8'),
				pragma
			)
		)
	);

	console.log(results);
}
