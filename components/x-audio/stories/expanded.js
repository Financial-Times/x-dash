exports.title = 'App player (expanded)';

exports.data = {
	expanded: true,
	playing: true,
	loading: false,
	title: 'Notre-Dame fire, Goldman slips, Netflix spend',
	seriesName: 'FT News Briefing',
	currentTime: 1234,
	duration: 5678,
	url: 'https://media.acast.com/ftnewsbriefing/tuesday-may7/media.mp3',
	onPlayClick: () => {},
	onPauseClick: () => {},
	onCloseClick: () => {}
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;

