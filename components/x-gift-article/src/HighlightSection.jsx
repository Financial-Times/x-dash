import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'

export default ({ shareType, showHighlightsShare }) => {
	if (shareType === ShareType.enterprise && showHighlightsShare) {
		return (
			<div className="o-forms-input o-forms-input--checkbox  o-forms-field x-gift-article__checkbox">
				<label htmlFor="includeHighlights">
					<input type="checkbox" id="includeHighlights" name="includeHighlights" value="includeHighlights" />
					<span className="o-forms-input__label x-gift-article__checkbox-span">
						Make Highlight visible to the recipients
					</span>
				</label>
			</div>
		)
	}

	return null
}
