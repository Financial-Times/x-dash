import nanoid from 'nanoid';
export default function generateRSSUrl(seriesId, baseURL, token) {
	return `${baseURL}/${seriesId}/${token || nanoid(10)}`;
}
