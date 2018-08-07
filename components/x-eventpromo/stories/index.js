const { Eventpromo } = require('../');

exports.component = Eventpromo;
exports.package = require('../package.json');
exports.stories = [
	require('./eventpromo'),
];

exports.knobs = (data, { text }) => ({
	dates() {
		return text('Dates', data.dates);
	},
	id() {
		return text('Id', data.id);
	},
	image1() {
		return text('Image1', data.image1);
	},
	image2() {
		return text('Image2', data.image2);
	},
	image3() {
		return text('Image3', data.image3);
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

