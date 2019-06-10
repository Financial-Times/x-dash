const { HeroWithImage } = require('../../');

exports.component = HeroWithImage;

exports.package = require('../../package.json');

exports.stories = [
	require('./hero-with-image'),
];

exports.knobs = require('../knobs');
