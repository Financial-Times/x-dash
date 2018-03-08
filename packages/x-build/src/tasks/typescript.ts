import {Component, OutputConfig, FileMap} from '../types';
import * as ts from 'typescript';
import * as fs from 'fs-extra';
import * as path from 'path';
import globby = require('globby');
import mapToObject from '../map-to-object';

const tsConfig: ts.CompilerOptions = {
	noImplicitAny: true,
	jsx: ts.JsxEmit.Preserve,
	types: [ '@financial-times/x-build' ],
	target: ts.ScriptTarget.ESNext,
	listEmittedFiles: true,
	// noEmitOnError: true,
};

export default async function compileTypescript(component: Component, config: OutputConfig): Promise<FileMap> {
	const root = await fs.realpath(
		component.root
	);

	const files = await globby(
		path.join(
			root,
			'src',
			'**/*.{ts,tsx}'
		)
	);

	const outDir = path.resolve(
		root,
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

	if(emitSkipped) {
		throw new Error('Typescript compilation failed');
	}

	const realEmittedFiles = await Promise.all(
		emittedFiles.map(file => fs.realpath(file))
	);

	return mapToObject(
		realEmittedFiles,
		file => file,
		file => file.replace(/dist\/jsx\/(.+)\.jsx$/, 'src/$1.tsx')
	);
};
