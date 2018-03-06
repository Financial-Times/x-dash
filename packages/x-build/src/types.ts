export type FilePath = string;

export type Task = (component: Component, config: OutputConfig) => Promise<FileMap>;

export type FileMap = {
	[from: string]: string
};

export const enum OutputType {
	hyperscript = 'hyperscript',
	jsx = 'jsx'
}

export interface HyperscriptConfig {
	type: OutputType.hyperscript,
	pragma: string
}

export interface JSXConfig {
	type: OutputType.jsx,
}

export type OutputConfig = HyperscriptConfig | JSXConfig;

export interface Package {
	root: FilePath,
}

export interface Host extends Package {
	dependencies: string[],
}

export interface Component extends Package {}
