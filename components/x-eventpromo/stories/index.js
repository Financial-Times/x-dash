const { Eventpromo } = require('../');

exports.component = Eventpromo;

exports.package = require('../package.json');

exports.dependencies = {
	'o-normalise': '^1.6.2',
	'o-typography': '^5.5.0'
};

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
	strapline() {
		return text('Strapline', data.strapline);
	},
	title() {
		return text('Title', data.title);
	}
});

