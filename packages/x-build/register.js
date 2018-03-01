const {addHook} = require('pirates');
const pkgUp = require('pkg-up');
const fs = require('fs');
const {transform} = require('@babel/core');

const readPkgJson = file => JSON.parse(
	fs.readFileSync(
		pkgUp.sync(file),
		'utf8'
	)
);

function compile(code) {
	return transform(code, {
		presets: [
			'@financial-times/x-build/babel-consume'
		]
	}).code;
}

const removeHook = addHook(compile, {
	matcher(file) {
		const pkg = readPkgJson(file);
		return pkg.name.startsWith('@financial-times/x-')
			&& pkg.name !== '@financial-times/x-build';
	},

	ignoreNodeModules: false,
});
