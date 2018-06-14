const path = require('path');

/**
 * Resolve Require
 * @param {string} dependency
 * @returns {any}
 */
module.exports = function (dependency) {
	// Always try to resolve dependencies relative to the CWD in case this module has been
	// symlinked into the consuming project, even without --preserve-symlinks
	// <https://nodejs.org/api/cli.html#cli_preserve_symlinks>
	const target = path.resolve(process.cwd(), 'node_modules', dependency);

	try {
		return require(target);
	} catch (error) {
		const cwd = process.cwd();
		throw new Error(`Failed to require ${dependency} from ${cwd} (${error.toString()})`);
	}
};
