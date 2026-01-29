import { h } from '@financial-times/x-engine'
import MetaLink from './MetaLink'
import Promoted from './Promoted'
import StreamLink from './StreamLink'

export default (props) => {
	const showPromoted = props.promotedPrefixText && props.promotedSuffixText

	if (showPromoted) {
		return <Promoted {...props} />
	}

	// MetaLink is a legacy Element, when showStreamLink and streamLinks are provided, we should render StreamLink instead.
	// However old content could not been migrated to the new content model right away, so we need to keep the both logic legacy and new for now.
	// StreamLinks logic is different from MetaLink, for example, opinion teaser metalinks doesn't include author names any more as the link etc.
	if (props.showStreamLink && props.streamLinks) {
		return <StreamLink {...props} />
	}

	return <MetaLink {...props} />
}
