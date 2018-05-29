const path = require('path');

module.exports = dependency => path.resolve(
	process.cwd(),
	'node_modules',
	dependency
);
