import { h } from '@financial-times/x-engine'
import MetaLink from './MetaLink'
import Promoted from './Promoted'

export default (props) => {
	const { teaserMetadata } = props
	const showPromoted =
		teaserMetadata && teaserMetadata.promotedPrefixText && teaserMetadata.promotedSuffixText

	return showPromoted ? <Promoted {...teaserMetadata} /> : <MetaLink {...props} />
}
