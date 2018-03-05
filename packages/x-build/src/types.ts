export type FilePath = string;
export type CompileStep = (files: FilePath[], config: XBuildConfig) => Promise<void>;

export interface XBuildConfig {
	compileSteps: CompileStep[],
}

export interface Package {
	root: FilePath,
}
