import { h } from '@financial-times/x-engine'
import TimeStamp from './TimeStamp'
import RelativeTime from './RelativeTime'
import LiveBlogStatus from './LiveBlogStatus'
import AlwaysShowTimestamp from './AlwaysShowTimestamp'
import PremiumLabel from './PremiumLabel'

export default (props) => {
	if (props.showPremiumLabel && props?.indicators?.accessLevel === 'premium') {
		return <PremiumLabel {...props} />
	}

	if (props.showStatus) {
		if (props.status) {
			return <LiveBlogStatus {...props} />
		}

		if (props.publishedDate) {
			if (props.useRelativeTimeIfToday) {
				return <AlwaysShowTimestamp {...props} />
			} else if (props.useRelativeTime) {
				return <RelativeTime {...props} />
			} else {
				return <TimeStamp {...props} />
			}
		}
	}

	return null
}
