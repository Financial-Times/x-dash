import {Package, FilePath, OutputType, Host, OutputConfig, Task, Component} from './types';
import * as tasks from './tasks';
import get = require('lodash/get');
import * as fs from 'mz/fs';
import * as path from 'path';

async function getFileList(pkg: Package, config: OutputConfig): Promise<FilePath[]> {
	return [];
}

function assertUnreachable(x: never): never {
	throw new Error("Didn't expect to get here");
}

function getTask(type: OutputType): Task {
	switch(type) {
		case OutputType.jsx:
			return tasks.typescript;
		case OutputType.hyperscript:
			return tasks.babel;
	}
}

function inferConfig(host: Host): OutputConfig {
	return {
		type: OutputType.hyperscript,
		pragma: host.dependencies.includes('react') ? 'React.createElement' : 'h'
	};
}

async function getOutputConfig(host?: Host): Promise<OutputConfig> {
	if(host == null) {
		return {
			type: OutputType.jsx
		};
	}

	const xBuildPath = path.resolve(host.root, 'x-build.json');

	if(await fs.exists(xBuildPath)) {
		return readJSON<OutputConfig>(
			xBuildPath
		);
	}

	return inferConfig(host);
}

async function readJSON<T>(path: FilePath): Promise<T> {
	return JSON.parse(
		await fs.readFile(path, 'utf8')
	) as T;
}

export default async function compile(component: Component, host: Host): Promise<void> {
	const config = await getOutputConfig(host);
	const files = await getFileList(component, config);
	const task = getTask(config.type);

	return task(files, config);
};
