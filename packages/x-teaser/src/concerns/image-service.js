const BASE_URL = 'https://www.ft.com/__origami/service/image/v2/images/raw';
const OPTIONS = ['source=next', 'fit=scale-down', 'compression=best'];

/**
 * Image Service
 * @param {String} url
 * @param {Number} width
 */
module.exports = (url, width) => {
	const encoded = encodeURIComponent(url);
	return `${BASE_URL}/${encoded}?${OPTIONS.join('&')}&width=${width}`;
};
