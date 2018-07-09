const { GiftArticle } = require('../');

// if (typeof window !== 'undefined' && !/\.ft\.com$/.test(window.location.hostname)) {
// 	console.warn('Due to CORS restrictions some demos may not work outside of the ft.com domain');
// }

module.exports = {
	name: 'x-gift-article',
	component: GiftArticle,
	stories: [
		require('./test')
	]
};
