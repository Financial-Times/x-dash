const BASE_URL = 'https://www.ft.com/__origami/service/image/v2/images/raw';

const OPTIONS = ['source=next', 'fit=scale-down', 'compression=best'];

export default (url: string, width: number) => {
	const encoded = encodeURIComponent(url);
	return `${BASE_URL}/${encoded}?${OPTIONS.join('&')}&width=${width}`;
};
