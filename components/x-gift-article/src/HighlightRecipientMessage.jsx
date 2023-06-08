import { h } from '@financial-times/x-engine'

export default ({ handleSaveAnnotations, handleCloseRecipientMessage }) => {
	return (
		<div className="x-gift-article-highlight-recipient-message">
			<p className="x-gift-article-highlight-recipient-message__title">Share the highlighted article</p>
			<div className="x-gift-article-highlight-recipient-message__divider"></div>
			<p className="o-typography-professional o-typography-inverse x-gift-article-highlight-recipient-message__description">
				If you wish to share the highlighted article,{' '}
				<button
					type="button"
					className="o-typography-link x-gift-article-highlight-recipient-message__save-highlights-button"
					onClick={handleSaveAnnotations}
				>
					save the highlights
				</button>{' '}
				as your own before creating the link.
			</p>
			<button
				className="x-gift-article-highlight-recipient-message__close"
				type="button"
				onClick={handleCloseRecipientMessage}
			>
				<span className="o-normalise-visually-hidden">Close</span>
			</button>
		</div>
	)
}
