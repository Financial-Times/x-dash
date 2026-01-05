const BASE_URL_V2 = 'https://www.ft.com/__origami/service/image/v2/images/raw'
const BASE_URL_V3 = 'https://images.ft.com/v3/image/raw'
const OPTIONS = { source: 'next', fit: 'scale-down', dpr: 2 }

/**
 * Image Service
 * @param {String} url
 * @param {Number} width
 * @param {String} options
 */
export default function imageService(url, width, options) {
	if (url.startsWith(BASE_URL_V2) || url.startsWith(BASE_URL_V3)) {
		const parsedUrl = new URL(url);

		parsedUrl.search = new URLSearchParams({
			...Object.fromEntries(parsedUrl.searchParams),
			...OPTIONS,
			...options,
		})

		if (width) {
			parsedUrl.searchParams.set('width', width);
		}

		return parsedUrl.toString();
	}

	const imageSrc = new URL(`${BASE_URL_V3}/${encodeURIComponent(url)}`)
	imageSrc.search = new URLSearchParams({ ...OPTIONS, ...options })
	imageSrc.searchParams.set('width', width)
	return imageSrc.href
}
