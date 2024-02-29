import { h } from '@financial-times/x-engine'

export const IncludeHighlights = (props) => {
	const { actions, hasHighlights, enterpriseEnabled, includeHighlights } = props

	const includeHighlightsHandler = (event) => {
		actions.setIncludeHighlights(event.target.checked)
	}

	return hasHighlights && enterpriseEnabled ? (
		<div className="o-forms-input o-forms-input--checkbox o-forms-field share-article-dialog__include-highlights">
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
	) : null
}
