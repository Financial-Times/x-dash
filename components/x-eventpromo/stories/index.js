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
	eventpromoId() {
		return text('Eventpromo Id', data.eventpromoId);
	},
	eventpromoLink() {
		return text('Eventpromo link', data.eventpromoLink);
	},
	eventpromoTitle() {
		return text('Eventpromo title', data.eventpromoTitle);
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
	location() {
		return text('Location', data.location);
	}
});

