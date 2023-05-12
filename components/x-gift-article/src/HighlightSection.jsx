import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'

export default ({
	shareType,
	hasHighlights,
	includeHighlightsHandler,
	includeHighlights,
	isGiftUrlCreated
}) => {
	if (shareType === ShareType.enterprise && hasHighlights) {
		if (isGiftUrlCreated && includeHighlights) {
			return (
				<div className="x-gift-article__checkbox">
					<div className="x-gift-article__highlight-shared">highlights visible to recipients</div>
				</div>
			)
		}
		return (
			<div className="o-forms-input o-forms-input--checkbox  o-forms-field x-gift-article__checkbox">
				<label htmlFor="includeHighlights">
					<input
						type="checkbox"
						id="includeHighlights"
						name="includeHighlights"
						value={includeHighlights}
						checked={includeHighlights}
						onChange={includeHighlightsHandler}
						disabled={isGiftUrlCreated}
					/>
					<span className="o-forms-input__label x-gift-article__checkbox-span">
						Make highlights visible to recipients
					</span>
				</label>
			</div>
		)
	}

	return null
}
