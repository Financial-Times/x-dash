const { default: createAudio } = require('../');

if (global && !global.Audio) {
	global.Audio = function () {
		this.addEventListener = () => {}
	}
}
exports.component = createAudio()

exports.package = require('../package.json');

// Set up basic document styling using the Origami build service
exports.dependencies = {
	'o-loading': '^3.1.1',
	'o-normalise': '^1.6.0',
	'o-icons': "^5.11.0",
	'o-typography': '^5.11.0',
	'o-colors': "^4.8.5"
};

exports.stories = [
	require('./redux-player')
];


exports.knobs = require('./knobs');
