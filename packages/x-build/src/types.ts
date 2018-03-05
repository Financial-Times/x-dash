export type FilePath = string;
export type CompileStep = (files: FilePath[], config: XBuildConfig) => Promise<void>;

export interface XBuildConfig {
	compileSteps: CompileStep[],
}

export enum XDashType {
	component
}

export interface Package {
	root: FilePath,
	package?: {
		name: string,
		version: string,
		'x-dash'?: {
			type?: XDashType,
		},
	},
}
