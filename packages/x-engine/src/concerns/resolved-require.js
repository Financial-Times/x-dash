const resolveModule = require('./resolve-module');

/**
 * Resolve Module
 * @param {string} dependency
 * @returns {any}
 */
module.exports = function(dependency) {
	// Always try to resolve dependencies relative to the CWD in case this module has been
	// symlinked into the consuming project, even without --preserve-symlinks
	// <https://nodejs.org/api/cli.html#cli_preserve_symlinks>
	try {
		const target = resolveModule(dependency);
		return require(target);
	} catch (error) {
		const cwd = process.cwd();
		throw new Error(`Failed to require ${dependency} from ${cwd}`);
	}
};
