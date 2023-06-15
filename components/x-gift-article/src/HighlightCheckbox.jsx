import { h } from '@financial-times/x-engine'

export default ({ setIncludeHighlights, includeHighlights, isGiftUrlCreated }) => {
	return (
		<div className="o-forms-input o-forms-input--checkbox o-forms-field x-gift-article__checkbox">
			<label htmlFor="includeHighlights">
				<input
					type="checkbox"
					id="includeHighlights"
					name="includeHighlights"
					value={includeHighlights}
					checked={includeHighlights}
					onChange={(event) => setIncludeHighlights(event.target.checked)}
					disabled={isGiftUrlCreated}
					data-trackable="make-highlights-visible"
				/>
				<span className="o-forms-input__label x-gift-article__checkbox-span">
					Make highlights visible to recipients
				</span>
			</label>
		</div>
	)
}
