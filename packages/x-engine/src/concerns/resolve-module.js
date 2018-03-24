const path = require('path');

/**
 * Resolve Module
 * @param {string} dependency
 * @returns {any}
 */
module.exports = function(dependency) {
	const cwd = process.cwd();

	let dep;

	// Always try to resolve dependencies relative to the CWD in case this module has been
	// symlinked into the consuming project, even without --preserve-symlinks
	// <https://nodejs.org/api/cli.html#cli_preserve_symlinks>
	try {
		const target = require.resolve(dependency, {
			paths: [path.join(cwd, 'node_modules')]
		});

		dep = require(target);
	} catch (error) {
		throw new Error(`Failed to require ${dependency} from ${cwd}`);
	}

	return dep;
};
