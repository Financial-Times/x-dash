import { h } from '@financial-times/x-engine'

export default ({ hideCopyConfirmation, isArticleSharingUxUpdates }) => (
	<div
		className="o-message o-message--alert o-message--success x-gift-article__copy-confirmation"
		role="alert"
	>
		<div className="o-message__container">
			<div className="o-message__content">
				<p className="o-message__content-main">
					{isArticleSharingUxUpdates ? (
						<span>The link has been copied to your clipboard</span>
					) : (
						<span className="o-message__content-highlight">The link has been copied to your clipboard</span>
					)}
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
