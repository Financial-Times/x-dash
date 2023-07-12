import { h } from '@financial-times/x-engine'

export default ({ hideCopyConfirmation }) => (
	<div
		className="o-message o-message--alert o-message--success share-article-dialog__copy-confirmation-alert"
		role="alert"
	>
		<div className="o-message__container">
			<div className="o-message__content">
				<p className="o-message__content-main">
					{<span className="o-message__content-highlight">Link copied to clipboard.</span>}
				</p>
			</div>

			<button
				className="o-message__close"
				aria-label="close"
				title="Close"
				onClick={hideCopyConfirmation}
			></button>
		</div>
	</div>
)
