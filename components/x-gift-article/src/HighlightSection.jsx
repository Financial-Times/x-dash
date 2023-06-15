import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
import HighlightRecipientMessage from './HighlightRecipientMessage'
import HighlightSavedMessage from './HighlightSavedMessage'
import HighlightCheckbox from './HighlightCheckbox'
import HighlightsApiClient from './lib/highlightsApi'

const USER_ANNOTATIONS_API = `https://enterprise-user-annotations-api.ft.com/v1`

export default ({
	shareType,
	includeHighlights,
	setIncludeHighlights,
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
		const url = new URL(location.href)
		const params = new URLSearchParams(url.search)
		const highlightsToken = params.get('highlights')
		const highlightsAPIClient = new HighlightsApiClient(USER_ANNOTATIONS_API)
		const response = await highlightsAPIClient.copySharedHighlights(highlightsToken)

		if (response) {
			saveHighlightsHandler()
			localStorage.setItem('showSuccessSavedMessage', 'true')
			dispatchEvent(new CustomEvent('removeHighlightsSave'))
		}
	}

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
				{showHighlightsRecipientMessage ? (
					<HighlightRecipientMessage
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
						setIncludeHighlights={setIncludeHighlights}
						isGiftUrlCreated={isGiftUrlCreated}
					/>
				) : null}
			</div>
		)
	}
	return null
}
