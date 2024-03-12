import { h } from '@financial-times/x-engine'
import { canShareWithNonSubscribers, isNonSubscriberOption } from './lib/highlightsHelpers'

export const IncludeHighlights = (props) => {
	const { actions, hasHighlights, enterpriseEnabled, includeHighlights } = props
	const _canShareWithNonSubscribers = canShareWithNonSubscribers(props)
	const _isNonSubscriberOption = isNonSubscriberOption(props)

	const includeHighlightsHandler = (event) => {
		actions.setIncludeHighlights(event.target.checked)
	}

	return hasHighlights && enterpriseEnabled && (_canShareWithNonSubscribers || !_isNonSubscriberOption) ? (
		<div
			className="o-forms-field o-forms-field--optional o-forms-field--professional share-article-dialog__include-highlights"
			role="group"
		>
			<div className="o-forms-input o-forms-input--checkbox o-forms-field">
				<label htmlFor="includeHighlights">
					<input
						type="checkbox"
						id="includeHighlights"
						name="includeHighlights"
						value={includeHighlights}
						checked={includeHighlights}
						onChange={includeHighlightsHandler}
						data-trackable="make-highlights-visible"
					/>
					<span className="o-forms-input__label x-gift-article__checkbox-span">Include highlights</span>
				</label>
			</div>
		</div>
	) : null
}
