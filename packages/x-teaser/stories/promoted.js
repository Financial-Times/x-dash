const { Teaser, presets } = require('../');

exports.title = 'Paid Post';

exports.data = Object.assign({
	type: 'paid-post',
	id: '',
	url: '#',
	title: 'Why eSports companies are on a winning streak',
	standfirst: 'ESports is big business and about to get bigger: global revenues could hit $1.5bn by 2020',
	promotedPrefix: 'Paid post',
	promotedSuffix: 'by UBS',
	image: {
		url: 'https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKCrm_3yahABGAEyCMx3RoLss603',
		width: 700,
		height: 394
	}
}, presets.SMALL_HEAVY);

// To ensure that component stories do not need to depend on Storybook themselves we return a
// function that may be passed the required dependencies.
exports.story = function ({ createProps }) {
	const props = createProps([
		'id',
		'url',
		'type',
		// Meta
		'showMeta',
		'promotedPrefix',
		'promotedSuffix',
		// Title
		'showTitle',
		'title',
		// Standfirst
		'showStandfirst',
		'standfirst',
		// Image
		'showImage',
		'image',
		'imageSize',
		// Variants
		'layout',
		'modifiers'
	]);

	return Teaser(props);
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
