import {Component, OutputConfig, FileMap} from '../types';
import * as ts from 'typescript';
import * as fs from 'fs-extra';
import * as path from 'path';
import globby = require('globby');

const tsConfig: ts.CompilerOptions = {
	noImplicitAny: true,
	jsx: ts.JsxEmit.Preserve,
	types: [ '@financial-times/x-build' ],
	target: ts.ScriptTarget.ESNext,
	listEmittedFiles: true,
	// noEmitOnError: true,
};

export default async function compileTypescript(component: Component, config: OutputConfig): Promise<FileMap> {
	const files = await globby(
		path.join(
			component.root,
			'src',
			'**/*.{ts,tsx}'
		)
	);

	const outDir = path.resolve(
		component.root,
		'dist/jsx'
	);

	await fs.ensureDir(outDir);
	tsConfig.outDir = outDir;

	const program = ts.createProgram(files, tsConfig);
	const preDiagnostics = ts.getPreEmitDiagnostics(program);

	const {
		emitSkipped,
		diagnostics,
		emittedFiles,
	} = program.emit();

	preDiagnostics.concat(diagnostics).forEach(diagnostic => {
		if (diagnostic.file) {
			let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
			let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
			console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
		}
		else {
			console.log(`${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`);
		}
	});

	console.log({
		emitSkipped,
		diagnostics,
		preDiagnostics,
		emittedFiles,
	});

	return emittedFiles.reduce(
		(fileMap, file) => Object.assign(fileMap, {
			[ file.replace(/dist\/jsx\/(.+)\.jsx$/, 'src/$1.tsx') ]: file
		}), {}
	);
};
