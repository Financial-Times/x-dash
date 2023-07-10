import { h } from '@financial-times/x-engine'
import HighlightsApiClient from './lib/highlightsApi'

export const ReceivedHighlightsAlert = ({ actions }) => {
	const handleSaveAnnotations = async (event) => {
		event.preventDefault()
		const url = new URL(location.href)
		const params = new URLSearchParams(url.search)
		const highlightsToken = params.get('highlights')
		const highlightsAPIClient = new HighlightsApiClient('https://enterprise-user-annotations-api.ft.com/v1')
		const { annotationsCopyResult } = await highlightsAPIClient.copySharedHighlights(highlightsToken)

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
						If you wish to share the article with the highlights, you need to{' '}
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a
							className="o-typography-professional o-typography-link"
							href=""
							rel="noreferrer"
							onClick={handleSaveAnnotations}
						>
							save the highlights
						</a>{' '}
						first.
					</p>
				</div>
				<button className="o-message__close" onClick={actions.closeHighlightsRecipientMessage} />
			</div>
		</div>
	)
}
