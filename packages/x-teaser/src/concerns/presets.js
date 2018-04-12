const { Layouts } = require('./constants');

exports.Small = {
	layout: Layouts.Small,
	showMeta: true,
	showTitle: true,
	showStatus: true
};

exports.SmallHeavy = {
	layout: Layouts.Small,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'Small'
};

exports.Large = {
	layout: Layouts.Large,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'Medium'
};

exports.LargeOpinion = {
	layout: Layouts.Large,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'Medium',
	modifiers: ['opinion-background']
};

exports.Hero = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'Medium'
};

exports.HeroNarrow = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true
};

exports.HeroCentred = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'Medium',
	modifiers: ['centre']
};

exports.HeroVideo = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	showVideo: true,
	imageSize: 'Large',
};

exports.HeroOverlay = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	showStatus: true,
	imageSize: 'XL',
	modifiers: ['hero-image']
};

exports.TopStory = {
	layout: Layouts.TopStory,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showRelatedLinks: true,
};

exports.TopStoryLandscape = {
	layout: Layouts.TopStory,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'XL',
	showRelatedLinks: true,
	modifiers: ['landscape']
};
