const { Button } = require('../');

exports.component = Button;
exports.package = require('../package.json');
exports.stories = [
	require('./styling'),
];
