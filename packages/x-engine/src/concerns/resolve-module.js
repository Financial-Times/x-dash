const resolve = require('resolve');

module.exports = function(dependency) {
	const cwd = process.cwd();

	return resolve.sync(dependency, {
		basedir: cwd
	});
};
