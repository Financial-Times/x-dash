import nanoid from 'nanoid';

const ACAST_RSS_URL = 'https://access.acast.cloud/rss';

export default function generateRSSUrl(seriesId) {
	const token = nanoid(10);
	return `${ACAST_RSS_URL}/${seriesId}/${token}`;
}