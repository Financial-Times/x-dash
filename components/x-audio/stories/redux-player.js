/* eslint-disable no-console */
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
		expand: () => console.log('expand notifier'),
		minimise: () => console.log('minimise notifier'),
	},
	options: {
		canExpand: true
	},
	imageDataSet: {
		url: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms:8af7af48-2d84-4e42-bf83-e9baf47d3b15?source=app&width=150&fit=scale-down',
		resolutions: [
			{
				url: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms:8af7af48-2d84-4e42-bf83-e9baf47d3b15?source=app&width=150&fit=scale-down',
				resolution: `150w`
			},
			{
				url: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms:8af7af48-2d84-4e42-bf83-e9baf47d3b15?source=app&width=150&fit=scale-down',
				resolution: `330w`
			}
		]
	}
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
