import { h } from '@financial-times/x-engine'
import TimeStamp from './TimeStamp'
import RelativeTime from './RelativeTime'
import LiveBlogStatus from './LiveBlogStatus'
import AlwaysShowTimestamp from './AlwaysShowTimestamp'
import PremiumLabel from './PremiumLabel'
import ScoopLabel from './ScoopLabel'

export default (props) => {
	if (props.showStatus && props.status) {
		return <LiveBlogStatus {...props} />
	}

	if (
		props.showScoopLabel &&
		props?.indicators?.isScoop &&
		// We plan to show the Scoop label only on homepages.
		// If we later show it on other pages, this cutoff date will need review.
		// The `isScoop` property already exists, but Editorial will use it differently after 2025-10-01.
		props.firstPublishedDate >= '2025-10-01T00:00:00.000Z'
	) {
		return <ScoopLabel {...props} />
	}

	if (props.showPremiumLabel && props?.indicators?.accessLevel === 'premium') {
		return <PremiumLabel {...props} />
	}

	if (props.showStatus && props.publishedDate) {
		if (props.useRelativeTimeIfToday) {
			return <AlwaysShowTimestamp {...props} />
		} else if (props.useRelativeTime) {
			return <RelativeTime {...props} />
		} else {
			return <TimeStamp {...props} />
		}
	}

	return null
}
