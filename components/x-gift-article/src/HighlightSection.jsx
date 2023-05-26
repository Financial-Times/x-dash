import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
import HighlightsMessage from './HighlightMessage'
import HighlightSavedMessage from './HighlightSavedMessage'
import HighlightCheckbox from './HighlightCheckbox'
import HighlightsApiClient from './lib/highlightsApi'

const USER_ANNOTATIONS_API = `https://enterprise-user-annotations-api.ft.com/v1`

export default ({
	shareType,
	includeHighlights,
	includeHighlightsHandler,
	isGiftUrlCreated,
	hasHighlights,
	saveHighlightsHandler,
	showHighlightsRecipientMessage,
	showHighlightsSuccessMessage,
	showHighlightsCheckbox,
	closeHighlightsSuccessMessage,
	closeHighlightsRecipientMessage
}) => {
	const handleSaveAnnotations = async () => {
		const highlightsToken = new URL(location.href).searchParams.get('highlights')
		const highlightsAPIClient = new HighlightsApiClient(USER_ANNOTATIONS_API)
		const response = await highlightsAPIClient.copySharedHighlights(highlightsToken)

		if (response) {
			saveHighlightsHandler()
		}
	}

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
				{showHighlightsRecipientMessage ? (
					<HighlightsMessage
						handleSaveAnnotations={handleSaveAnnotations}
						handleCloseRecipientMessage={closeHighlightsRecipientMessage}
					/>
				) : null}
				{showHighlightsSuccessMessage ? (
					<HighlightSavedMessage handleCloseSuccessMessage={closeHighlightsSuccessMessage} />
				) : null}
				{showHighlightsCheckbox ? (
					<HighlightCheckbox
						includeHighlights={includeHighlights}
						includeHighlightsHandler={includeHighlightsHandler}
						isGiftUrlCreated={isGiftUrlCreated}
					/>
				) : null}
			</div>
		)
	}
	return null
}
