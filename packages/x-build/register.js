// this file commits all kinds of sin. i'm sorry.

const {addHook} = require('pirates');
const pkgUp = require('pkg-up');
const fs = require('fs');
const path = require('path');
const {default: compile} = require('./lib/compile');
const wait = require('blocking-await');

const readJSON = file => JSON.parse(
	fs.readFileSync(
		file,
		'utf8'
	)
);

// block the main thread until the compile promise resolves.
//
// yeah, i feel as icky about this as you. but the actual require hook
// needs to be synchronous and i'd rather have this one little bit of
// bleugh than rewrite the compiler to be sync mmkay.
const targetMap = wait(
	compile(process.cwd())
);

function getPrecompiledMappings(root) {
	const mappingsFile = path.resolve(
		root,
		'x-build-mappings.json'
	);

	return readJSON(mappingsFile);
}

function resolveMappings(mappings, file) {
	for(const target in mappings) if(mappings.hasOwnProperty(target)) {
		if(mappings[target][file]) {
			return resolveMappings(mappings, mappings[target][file]);
		}
	}

	return file;
}

function getCompiled(code, file) {
	const pkgPath = pkgUp.sync(file);
	const pkg = readJSON(pkgPath);
	const root = path.dirname(pkgPath);

	const allMappings = Object.assign(
		getPrecompiledMappings(root),
		targetMap[pkg.name],
	);

	const resolved = resolveMappings(allMappings, file);

	return fs.readFileSync(resolved, 'utf8');
}

const removeHook = addHook(getCompiled, {
	exts: ['.ts', '.tsx'],

	matcher(file) {
		const pkgPath = pkgUp.sync(file);
		const root = path.dirname(pkgPath);
		const pkg = readJSON(pkgPath);

		const matches = root !== process.cwd()
			&& pkg.name.startsWith('@financial-times/x-')
			&& pkg.name !== '@financial-times/x-build';

		return !!matches;
	},

	ignoreNodeModules: false,
});
