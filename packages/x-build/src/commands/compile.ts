import {Command, Context, command, metadata} from 'clime';
import compile from '../compile';
import readJSON from '../read-json';
import * as path from 'path';

@command({
	description: 'compile all x-dash dependencies of this app',
})
export default class Compile extends Command {
	@metadata
	async execute(context: Context) {
		const pkgPath = path.resolve(context.cwd, 'package.json');
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
			root: context.cwd,
			dependencies,
		};

		await Promise.all(
			xDependencies.map(
				component => compile({
					root: path.resolve(
						context.cwd,
						'node_modules',
						component
					)
				}, host)
			)
		);
	}
};
