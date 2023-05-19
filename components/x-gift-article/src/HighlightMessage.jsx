import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'

const USER_ANNOTATIONS_API = `https://local.ft.com:8010/v1`

export default ({ shareType }) => {
	const highlightToken = new URL(location.href).searchParams.get('highlights')

	const saveHighlights = async () => {
		await fetch(`${USER_ANNOTATIONS_API}/copy-annotations`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(highlightToken),
			credentials: 'include'
		})

		const highlightRecipientMessage = document.getElementById('highlight-recipient-message')
		highlightRecipientMessage.classList.add('hide')
	}

	if (shareType === ShareType.enterprise && highlightToken) {
		return (
			<div>
				<div id="highlight-recipient-message" className="highlight-recipient-message">
					<div className="highlight-message-content">
						<p className="title">Share the highlighted article</p>
						<div className="divider"></div>
						<p className="description">
							If you wish to share the highlighted article,{' '}
							<button className="save-highlights-link" onClick={saveHighlights}>
								save the highlights
							</button>{' '}
							as your own before generating the link.{' '}
						</p>
						<button className="close" type="button"></button>
					</div>
				</div>
			</div>
		)
	}

	return null
}
