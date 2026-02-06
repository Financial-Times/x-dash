import { h } from '@financial-times/x-engine'
import TimeStamp from './TimeStamp'
import RelativeTime from './RelativeTime'
import LiveBlogStatus from './LiveBlogStatus'
import AlwaysShowTimestamp from './AlwaysShowTimestamp'
import PremiumLabel from './PremiumLabel'
import ExclusiveLabel from './ExclusiveLabel'

export default (props) => {
	if (props.showStatus && props.status) {
		return <LiveBlogStatus {...props} />
	}

	if (props.showExclusiveLabel && props?.indicators?.isExclusive) {
		return <ExclusiveLabel {...props} />
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
