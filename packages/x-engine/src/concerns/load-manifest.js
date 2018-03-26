const path = require('path');

/**
 * Load Manifest
 * @returns {object}
 */
module.exports = function() {
	const cwd = process.cwd();
	const manifest = path.join(cwd, 'package.json');

	let pkg;

	try {
		pkg = require(manifest);
	} catch (error) {
		throw new Error(`Failed to load package.json from ${cwd}`);
	}

	return pkg;
};
