exports.title = 'App player';

exports.data = {
	expanded: false,
	playing: false,
	title: 'Notre-Dame fire, Goldman slips, Netflix spend',
	seriesName: 'FT News Briefing',
	url: 'https://media.acast.com/ftnewsbriefing/tuesday-may7/media.mp3',
	trackingContext: {
		contentId: 'abc-123'
	},
	notifiers: {
		tracking: (...args) => console.log('tracking notifier, args', ...args),
		play: () => console.log('play notifier'),
		pause: () => console.log('pause notifier'),
		ended: () => console.log('ended notifier'),
	}
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
