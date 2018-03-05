import * as ts from 'typescript';
import * as fs from 'mz/fs';
import {FilePath, OutputConfig} from '../types';

const tsConfig: ts.CompilerOptions = {
	noImplicitAny: true,
	jsx: ts.JsxEmit.Preserve,
	types: [ '@financial-times/x-build' ],
	target: ts.ScriptTarget.ESNext
};

export default async function compileTypescript(files: FilePath[], config: OutputConfig) {
	const program = ts.createProgram(files, tsConfig);
	const a = program.emit();
	console.log(a);
}
