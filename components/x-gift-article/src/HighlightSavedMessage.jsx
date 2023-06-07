import { h } from '@financial-times/x-engine'

export default ({ handleCloseSuccessMessage }) => {
	return (
		<div
			className="o-message o-message--alert o-message--success x-gift-article__highlights-saved-message"
			data-o-component="o-message"
		>
			<div className="o-message__container">
				<div className="o-message__content">
					<p className="o-message__content-main">
						<span className="o-message__content-highlight">Highlights saved.</span>
					</p>
					<button type="button" className="o-message__close" onClick={handleCloseSuccessMessage}>
						<span className="o-normalise-visually-hidden">Close</span>
					</button>
				</div>
			</div>
		</div>
	)
}
