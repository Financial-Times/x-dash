import {FilePath, FileMap, OutputType} from './types';
import readJSON from './read-json';
import compileComponent from './compile-component';
import * as path from 'path';
import mapToObject from './map-to-object';
import promiseAllObject from './promise-all-object';

export default async function compile(root: FilePath): Promise<{
	[component: string]: {
		[output: string]: FileMap
	}
}> {
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

	return promiseAllObject(
		mapToObject(
			xDependencies,
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
