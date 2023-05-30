import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
import HighlightCheckbox from './HighlightCheckbox'
export default ({
	shareType,
	includeHighlights,
	includeHighlightsHandler,
	isGiftUrlCreated,
	hasHighlights
}) => {
	if (shareType === ShareType.enterprise && hasHighlights) {
		if (isGiftUrlCreated && includeHighlights) {
			return (
				<div className="x-gift-article__highlight-section">
					<div className="x-gift-article__highlight-shared">highlights visible to recipients</div>
				</div>
			)
		}
		return (
			<div className="x-gift-article__highlight-section">
				<HighlightCheckbox
					includeHighlights={includeHighlights}
					includeHighlightsHandler={includeHighlightsHandler}
					isGiftUrlCreated={isGiftUrlCreated}
				/>
			</div>
		)
	}
	return null
}
