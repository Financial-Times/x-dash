exports.title = 'With gift credits';

exports.data = {
	title: 'Share this article',
	isFreeArticle: false,
	credit: 20,
	monthlyAllowance: 20,
	dateText: 'May 1',
	isGift: true,
	url: 'dummy-url',
	giftUrl: 'gift-url',
	nonGiftUrl: 'non-gift-url',
	mailtoUrl: 'mailto:?subject=title&amp;body=nonGiftMailtoUrl',
	mailtoGiftUrl: 'mailto:?subject=title&amp;body=giftMailtoUrl',
	mailtoNonGiftUrl: 'mailto:?subject=title&amp;body=nonGiftMailtoUrl',
	isGiftUrlCreated: false
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
	'mailtoUrl',
	'mailtoGiftUrl',
	'mailtoNonGiftUrl',
	'isGiftUrlCreated'
];

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
