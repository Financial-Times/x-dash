import nanoid from 'nanoid';

export default function generateRSSUrl(acastHost, seriesId, token) {
	// ie. http://access.acast.cloud/rss/ft-test/tYPWWHla
	return `${acastHost}/rss/${seriesId}/${token || nanoid(10)}`;
}
