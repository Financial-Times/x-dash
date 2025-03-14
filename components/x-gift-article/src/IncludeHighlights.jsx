import { h } from '@financial-times/x-engine'
import { canShareWithNonSubscribers, isNonSubscriberOption, trimHighlights } from './lib/highlightsHelpers'

export const IncludeHighlights = (props) => {
	const { actions, highlight, enterpriseEnabled, includeHighlights, highlightClassName } = props
	const _canShareWithNonSubscribers = canShareWithNonSubscribers(props)
	const _isNonSubscriberOption = isNonSubscriberOption(props)

	const includeHighlightsHandler = (event) => {
		actions.setIncludeHighlights(!event.target.checked)
	}

	return highlight !== undefined &&
		enterpriseEnabled &&
		(_canShareWithNonSubscribers || !_isNonSubscriberOption) ? (
		<div
			className="o-forms-field o-forms-field--optional o-forms-field--professional share-article-dialog__include-highlights"
			role="group"
		>
			{includeHighlights && (
				<div className="shared-article-dialog__include-highlights-quote-wrapper">
					<h3 className="share-article-dialog__header">
						<span className="o3-type-body-highlight share-article-dialog__header-share-article-title">
							Highlighted text when shared:
						</span>
					</h3>

					<mark className={`shared-article-dialog__include-highlights-quote ${highlightClassName}`}>
						{trimHighlights(highlight)}
					</mark>
				</div>
			)}
			<div className="o-forms-input o-forms-input--checkbox o-forms-field">
				<label htmlFor="excludeHighlights">
					<input
						type="checkbox"
						id="excludeHighlights"
						name="excludeHighlights"
						value={!includeHighlights}
						checked={!includeHighlights}
						onChange={includeHighlightsHandler}
						data-trackable="make-highlights-visible"
					/>
					<span className="o-forms-input__label x-gift-article__checkbox-span">Don't include highlights</span>
				</label>
			</div>
		</div>
	) : null
}
