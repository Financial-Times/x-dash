const {addHook} = require('pirates');
const pkgUp = require('pkg-up');
const fs = require('fs');

const readPkgJson = file => JSON.parse(
	fs.readFileSync(
		pkgUp.sync(file),
		'utf8'
	)
);

function compile(code) {
	//TODO use compiler. ensure the sync bits of it are accessible
	return '';
}

const removeHook = addHook(compile, {
	matcher(file) {
		const pkg = readPkgJson(file);
		return pkg.name.startsWith('@financial-times/x-')
			&& pkg.name !== '@financial-times/x-build';
	},

	ignoreNodeModules: false,
});
