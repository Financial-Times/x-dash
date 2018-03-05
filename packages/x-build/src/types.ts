export type FilePath = string;

export enum OutputType {
	hyperscript,
	jsx
}

export type Task = (files: FilePath[], config: OutputConfig) => Promise<void>;

export type OutputConfig = {
	type: OutputType.hyperscript,
	pragma: string
} | {
	type: OutputType.jsx,
};

export interface Package {
	root: FilePath,
}

export interface Host extends Package {
	dependencies: string[],
}

export interface Component extends Package {}
