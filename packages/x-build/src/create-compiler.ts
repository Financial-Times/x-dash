import {Package, XBuildConfig, CompileStep, FilePath, XDashType} from './types';
import * as configurations from './configurations';

function isXComponent(pkg: Package): boolean {
	if(typeof pkg.package['x-dash'] !== 'undefined') {
		return pkg.package['x-dash']!.type === XDashType.component;
	}

	return false;
}

async function getFileList(pkg: Package, config: XBuildConfig): Promise<FilePath[]> {
	return [];
}

async function getConfig(pkg: Package): Promise<XBuildConfig> {
	if(isXComponent(pkg)) {
		return configurations.publish;
	}

	return {
		compileSteps: [],
	};
}

export default async function compile(pkg: Package): Promise<void> {
	const config = await getConfig(pkg);
	const files = await getFileList(pkg, config);

	for(const step of config.compileSteps) {
		await step(files, config);
	}
};
