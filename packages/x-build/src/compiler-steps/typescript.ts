import * as ts from 'typescript';
import * as fs from 'mz/fs';
import {FilePath, XBuildConfig} from '../types';

const tsConfig: ts.CompilerOptions = {
	noImplicitAny: true,
	noEmit: true,
	jsx: ts.JsxEmit.Preserve,
	types: [
		'@financial-times/x-build'
	],
	target: ts.ScriptTarget.ESNext
};

export default async function compileTypescript(files: FilePath[], config: XBuildConfig) {
	const program = ts.createProgram(files, tsConfig);
}
