import { h } from '@financial-times/x-engine'

export const NoCreditAlert = ({ children }) => {
	return (
		<div
			id="no-credit-alert"
			className="o-message o-message--alert o-message--neutral share-article-dialog__alert"
			data-o-component="o-message"
		>
			<div className="o-message__container">
				<div className="o-message__content">
					<p className="o-message__content-main">{children}</p>
				</div>
			</div>
		</div>
	)
}
