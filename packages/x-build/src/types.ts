export type FilePath = string;

export type Task = (component: Component, config: OutputConfig, host?: Host) => Promise<FileMap>;

export type FileMap = {
	[from: string]: string
}

export const enum OutputType {
	hyperscript = 'hyperscript',
	jsx = 'jsx'
}

export interface HyperscriptOptions {
	pragma: string,
	import: string
}

export type HyperscriptMode = 'react' | 'preact' | 'vhtml';

export type HyperscriptConfig = {
	type: OutputType.hyperscript,
	mode: HyperscriptMode,
	options?: HyperscriptOptions
};

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
