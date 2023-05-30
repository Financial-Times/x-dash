import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
export default ({ shareType, includeHighlights, isGiftUrlCreated, hasHighlights }) => {
	if (shareType === ShareType.enterprise && hasHighlights) {
		if (isGiftUrlCreated && includeHighlights) {
			return (
				<div className="x-gift-article__highlight-section">
					<div className="x-gift-article__highlight-shared">highlights visible to recipients</div>
				</div>
			)
		}
	}
	return null
}
