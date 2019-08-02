import nanoid from 'nanoid';

export default function generateRSSUrl(seriesId, acastHost, token) {
	// ie. http://access.acast.cloud/rss/ft-test/tYPWWHla
	return `${acastHost}/rss/${seriesId}/${token || nanoid(10)}`;
}
