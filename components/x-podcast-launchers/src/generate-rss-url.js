import nanoid from 'nanoid';
export default function generateRSSUrl(seriesId, baseURL) {
	const token = nanoid(10);
	return `${baseURL}/${seriesId}/${token}`;
}
