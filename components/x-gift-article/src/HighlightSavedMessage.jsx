import { h } from '@financial-times/x-engine'

export default ({ handleCloseSuccessMessage }) => {
	return (
		<div
			className="o-message o-message--alert o-message--success highlights-saved-message"
			data-o-component="o-message"
		>
			<div className="o-message__container">
				<div className="o-message__content">
					<p className="o-message__content-main">
						<span className="o-message__content-highlight">Highlights saved.</span>
					</p>
					<button
						type="button"
						className="o-message__close"
						aria-label="close"
						title="Close"
						onClick={handleCloseSuccessMessage}
					></button>
				</div>
			</div>
		</div>
	)
}
