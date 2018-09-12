const { Eventpromo } = require('../');

exports.component = Eventpromo;
exports.package = require('../package.json');
exports.stories = [
	require('./eventpromo'),
];

exports.knobs = (data, { text, boolean }) => ({
	isPaused() {
		return boolean('Animation paused?', data.isPaused);
	},
	dates() {
		return text('Dates', data.dates);
	},
	id() {
		return text('Id', data.id);
	},
	images() {
		return text('Images', data.images);
	},
	link() {
		return text('Link', data.link);
	},
	location() {
		return text('Location', data.location);
	},
	title() {
		return text('Title', data.title);
	}
});

