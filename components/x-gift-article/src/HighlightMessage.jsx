import { h } from '@financial-times/x-engine'

export default ({ handleSaveAnnotations, handleCloseRecipientMessage }) => {
	return (
		<div className="highlight-recipient-message">
			<div className="highlight-message-content">
				<p className="title">Share the highlighted article</p>
				<div className="divider"></div>
				<p className="description">
					If you wish to share the highlighted article,
					<button type="button" className="save-highlights-button" onClick={handleSaveAnnotations}>
						save the highlights
					</button>
					as your own before generating the link.
				</p>
				<button className="close" type="button" onClick={handleCloseRecipientMessage}></button>
			</div>
		</div>
	)
}
