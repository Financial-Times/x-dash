import { h } from '@financial-times/x-engine'

export default ({ includeHighlightsHandler, includeHighlights, isGiftUrlCreated }) => {
	return (
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
	)
}
