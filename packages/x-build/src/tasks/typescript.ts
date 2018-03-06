import * as ts from 'typescript';
import * as fs from 'mz/fs';
import * as os from 'os';
import * as path from 'path';
import {FilePath, OutputConfig, FileMap} from '../types';

const tsConfig: ts.CompilerOptions = {
	noImplicitAny: true,
	jsx: ts.JsxEmit.Preserve,
	types: [ '@financial-times/x-build' ],
	target: ts.ScriptTarget.ESNext,
	listEmittedFiles: true,
	noEmitOnError: true,
};

export default async function compileTypescript(files: FilePath[], config: OutputConfig): Promise<FileMap> {
	const prefix = path.join(
		os.tmpdir(),
		'x-build-typescript-'
	);

	const temp = fs.mkdtempSync(prefix);
	tsConfig.outDir = temp;

	const program = ts.createProgram(files, tsConfig);
	const preDiagnostics = ts.getPreEmitDiagnostics(program);

	const {
		emitSkipped,
		diagnostics,
		emittedFiles,
	} = program.emit();

	console.log({
		emitSkipped,
		diagnostics,
		preDiagnostics,
		emittedFiles,
	});

	return {};
};
