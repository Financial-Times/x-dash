exports.title = 'With gift credits';

exports.data = {
	title: 'Share this article',
	isFreeArticle: false,
	credit: 20,
	monthlyAllowance: 20,
	dateText: 'May 1',
	isGift: true,
	url: 'https://dummy-url',
	urlType: 'example-gift-link',
	giftUrl: 'https://gift-url',
	nonGiftUrl: 'https://non-gift-url',
	mailtoUrl: 'mailto:?subject=title&amp;body=nonGiftMailtoUrl',
	mailtoGiftUrl: 'mailto:?subject=title&amp;body=giftMailtoUrl',
	mailtoNonGiftUrl: 'mailto:?subject=title&amp;body=nonGiftMailtoUrl',
	isGiftUrlCreated: false,
	tracking: 'giftLink'
};

exports.knobs = [
	'showTitle',
	'title',
	'isFreeArticle',
	'credit',
	'isGift',
	'giftUrl',
	'nonGiftUrl',
	'url',
	'urlType',
	'mailtoUrl',
	'mailtoGiftUrl',
	'mailtoNonGiftUrl',
	'isGiftUrlCreated',
	'tracking'
];

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
