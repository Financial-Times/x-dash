const { Layouts } = require('./constants');

exports.SMALL_LIGHT = {
	layout: Layouts.Small,
	showMeta: true,
	showTitle: true,
	showStatus: true
};

exports.SMALL_HEAVY = {
	layout: Layouts.Small,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'Small'
};

exports.SMALL_HEAVY_STACKED = {
	layout: Layouts.Small,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'Small',
	modifiers: ['stacked']
};

exports.SMALL_HEAVY_OPINION = {
	layout: Layouts.Small,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: false,
	showHeadshot: true
};

exports.LARGE = {
	layout: Layouts.Large,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'Medium'
};

exports.LARGE_OPINION = {
	layout: Layouts.Large,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'Medium',
	modifiers: ['opinion-background']
};

exports.HERO = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'Medium'
};

exports.HERO_NARROW = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true
};

exports.HERO_CENTRED = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'Medium',
	modifiers: ['centre']
};

exports.HERO_INLINE_VIDEO = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	imageSize: 'L',
	modifiers: ['big-video']
};

exports.HERO_OVERLAY_IMAGE = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	showStatus: true,
	imageSize: 'XL',
	modifiers: ['hero-image']
};

exports.TOP_STORY = {
	layout: Layouts.TopStory,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showRelated: true,
};

exports.TOP_STORY_LANDSCAPE = {
	layout: Layouts.TopStory,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'Large',
	showRelated: true,
	modifiers: ['landscape']
};

exports.TOP_STORY_LANDSCAPE_BIG = {
	layout: Layouts.TopStory,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'XL',
	showRelated: true,
	modifiers: ['landscape', 'big-story']
};
