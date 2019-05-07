exports.title = 'App player (minimised)';

exports.data = {
	expanded: false,
	playing: true,
	loading: false,
	title: 'Notre-Dame fire, Goldman slips, Netflix spend',
	seriesName: 'FT News Briefing',
	currentTime: 1234,
	duration: 5678,
	onPlayClick: () => {},
	onPauseClick: () => {},
	onCloseClick: () => {}
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;

