export type FilePath = string;

export type Task = (files: FilePath[], config: OutputConfig) => Promise<void>;

export enum OutputType {
	hyperscript,
	jsx
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
