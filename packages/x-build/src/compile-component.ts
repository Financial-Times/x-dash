import {Package, FilePath, FileMap, OutputType, Host, OutputConfig, Task, Component} from './types';
import * as tasks from './tasks';
import * as fs from 'fs-extra';
import * as path from 'path';
import readJSON from './read-json';
import promiseAllObject from './promise-all-object';
import mapToObject from './map-to-object';

function assertUnreachable(x: never): never {
	throw new Error(`Unexpected ${x}`);
}

function getTask(type: OutputType): Task {
	switch(type) {
		case OutputType.jsx:
			return tasks.typescript;
		case OutputType.hyperscript:
			return tasks.babel;
	}
}

function inferConfig(host: Host): OutputConfig[] {
	return [{
		type: OutputType.hyperscript,
		pragma: host.dependencies.includes('react') ? 'React.createElement' : 'h',
	}];
}

async function getOutputConfigs(host?: Host): Promise<OutputConfig[]> {
	if(host == null) {
		return [
			{ type: OutputType.jsx },
		];
	}

	const xBuildPath = path.resolve(host.root, 'x-build.json');

	if(await fs.pathExists(xBuildPath)) {
		return [await readJSON<OutputConfig>(
			xBuildPath
		)];
	}

	return inferConfig(host);
}

export default async function compile(component: Component, host?: Host): Promise<{
	[output: string]: FileMap
}> {
	const configs = await getOutputConfigs(host);
	console.log({configs});

	return promiseAllObject(
		mapToObject(
			configs,
			async config => {
				const task = getTask(config.type);
				return task(component, config);
			},
			config => config.type
		)
	);
};
