exports.title = 'Eventpromo';

exports.data = {
	'dates': '12 November - 14 November 2018',
	'id': 'fancyEventId',
	'image1': 'https://www.ft.com/__assets/creatives/better-promo/break_out.jpg',
	'image2': 'https://www.ft.com/__assets/creatives/better-promo/audiance_clapping.jpg',
	'image3': 'https://live.ft.com/var/ftlive/storage/images/events/2018/ft-brexit-and-beyond-summit/888258-7-eng-GB/FT-Brexit-and-Beyond-Summit.png',
	'link': 'https://live.ft.com/Events/2018/FT-Brexit-and-Beyond-Summit?segmentId=some-segment-id&amp;variant=false',
	'location': 'planet earth',
	'title': 'FT Brexit and Beyond Summit'
};

exports.knobs = [
	'dates',
	'id',
	'image1',
	'image2',
	'image3',
	'link',
	'location',
	'title'
];

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
