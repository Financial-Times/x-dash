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
	showImage: true
};

exports.SMALL_HEAVY_STACKED = {
	layout: Layouts.Small,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
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
	showImage: true
};

exports.HERO = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true
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
	modifiers: ['centre']
};

exports.HERO_OPINION = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	modifiers: ['opinion-background']
};

exports.HERO_INLINE_VIDEO = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	modifiers: ['big-video']
};

exports.HERO_OVERLAY_IMAGE = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	modifiers: ['hero-image']
};

exports.TOP_STORY = {
	layout: Layouts.TopStory,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
};

exports.TOP_STORY_LANDSCAPE = {
	layout: Layouts.TopStory,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	modifiers: ['landscape']
};

exports.TOP_STORY_LANDSCAPE_BIG_IMAGE = {
	layout: Layouts.TopStory,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	modifiers: ['landscape', 'big-story']
};
