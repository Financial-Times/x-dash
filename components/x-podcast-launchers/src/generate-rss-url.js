import nanoid from 'nanoid';

export default function generateRSSUrl(acastHost, seriesId, token) {
	// the API needs any token for now, as it is a private RSS feed.
	// If the experiment successful these tokens would eventually be tied to the user’s account with Membership
	// ie. https://access.acast.cloud/rss/ft-test/tYPWWHla
	return `${acastHost}/rss/${seriesId}/${token || nanoid(10)}`;
}
