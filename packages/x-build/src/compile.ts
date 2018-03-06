import {FilePath} from './types';
import readJSON from './read-json';
import compileComponent from './compile-component';
import * as path from 'path';

export default async function compile(root: FilePath) {
	const pkgPath = path.resolve(root, 'package.json');
	const {dependencies: pkgDependencies} = await readJSON<{
		dependencies: {
			[pkg: string]: string
		}
	}>(pkgPath);

	const dependencies = Object.keys(pkgDependencies);
	const xDependencies = dependencies.filter(
		dep => dep.startsWith('@financial-times/x-')
			&& dep !== '@financial-times/x-build'
	);

	const host = {
		root,
		dependencies,
	};

	await Promise.all(
		xDependencies.map(
			component => compileComponent({
				root: path.resolve(
					root,
					'node_modules',
					component
				)
			}, host)
		)
	);
};
