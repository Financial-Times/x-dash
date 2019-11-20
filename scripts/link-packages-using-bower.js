/*
  This script symlinks packages which have Bower dependencies into the top-level
  bower_components/ folder so that when the `bower install` command is executed
  in the repository root all of their dependencies will be installed.
*/

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const bowerPath = path.resolve('./bower_components');
const bowerManifests = glob.sync('./components/*/bower.json', { absolute: true });

if (!fs.existsSync(bowerPath)) {
	fs.mkdirSync(bowerPath);
}

bowerManifests.forEach((bowerManifest) => {
	const targetPath = path.dirname(bowerManifest);
	const destinationPath = path.join(bowerPath, path.basename(targetPath));

	if (!fs.existsSync(destinationPath)) {
		console.info(`Linking ${targetPath} into ${bowerPath}`); // eslint-disable-line no-console
		fs.symlinkSync(targetPath, destinationPath);
	}
});
