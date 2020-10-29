const BASE_URL = 'https://www.ft.com/__origami/service/image/v2/images/raw';
const OPTIONS = { source:'next', fit:'scale-down', dpr:2 };

/**
 * Image Service
 * @param {String} url
 * @param {Number} width
 * @param {String} options
 */
export default function imageService(url, width, options) {
	
	const imageOptions = {...OPTIONS, ...options, width };
	const encoded = encodeURIComponent(url);
	const optionsEncoded = Object.entries(imageOptions).map(([key,value])=>`&${key}=${value}`).join('');
	const href = `${BASE_URL}/${encoded}?${optionsEncoded}`;
	return href;
}
