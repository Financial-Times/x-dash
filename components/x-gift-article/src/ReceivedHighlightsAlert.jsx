import { h } from '@financial-times/x-engine'
import HighlightsApiClient from './lib/highlightsApi'
import {
	SAVED_ANNOTATIONS_LOCAL_STORAGE_KEY,
	parsedSavedAnnotationsFromLocalStorage
} from './lib/highlightsHelpers'

export const ReceivedHighlightsAlert = ({ actions }) => {
	const handleSaveAnnotations = async (event) => {
		event.preventDefault()
		const url = new URL(location.href)
		const params = new URLSearchParams(url.search)
		const highlightsToken = params.get('highlights')
		const highlightsAPIClient = new HighlightsApiClient('https://enterprise-user-annotations-api.ft.com/v1')
		const { annotationsCopyResult } = await highlightsAPIClient.copySharedHighlights(highlightsToken)

		try {
			const savedSharedAnnotations = parsedSavedAnnotationsFromLocalStorage()

			savedSharedAnnotations.push(highlightsToken)

			// Write the updated savedSharedAnnotations list to localStorage.
			localStorage.setItem(SAVED_ANNOTATIONS_LOCAL_STORAGE_KEY, JSON.stringify(savedSharedAnnotations))
		} catch {
			// If the savedSharedAnnotations cannot be parsed initialise it with the current articleId.
			const savedSharedAnnotations = [highlightsToken]
			// Write the savedSharedAnnotations list to localStorage.
			localStorage.setItem(SAVED_ANNOTATIONS_LOCAL_STORAGE_KEY, JSON.stringify(savedSharedAnnotations))
		}

		if (annotationsCopyResult) {
			actions.saveHighlightsHandler()
		}
	}

	return (
		<div
			id="received-highlights-alert"
			className="o-message o-message--alert o-message--received-highlights share-article-dialog__alert"
			data-o-component="o-message"
		>
			<div className="o-message__container">
				<div className="o-message__content">
					<p className="o-message__content-main">
						If you wish to share the highlighted article{', '}
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a
							className="o-typography-professional o-typography-link"
							href=""
							rel="noreferrer"
							onClick={handleSaveAnnotations}
						>
							save the highlights
						</a>{' '}
						as your own before creating the link.
					</p>
				</div>
				<button className="o-message__close" onClick={actions.closeHighlightsRecipientMessage} />
			</div>
		</div>
	)
}
