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
// bleugh than rewrite the compiler to by sync mmkay.
const targetMap = wait(
	compile(process.cwd())
);

// TODO component package.json main points to src/index.tsx. we map that all the
// way through targetMap (which requires shipping the precompile targetMap)
// to the target file

function getCompiled(code, file) {
	console.log(file);
	return '';
}

const removeHook = addHook(getCompiled, {
	matcher(file) {
		const pkgPath = pkgUp.sync(file)
		const base = path.dirname(pkgPath);
		const pkg = readJSON(pkgPath);

		return file.match(/\.tsx?$/)
			&& base !== process.cwd()
			&& pkg.name.startsWith('@financial-times/x-')
			&& pkg.name !== '@financial-times/x-build';
	},

	ignoreNodeModules: false,
});
