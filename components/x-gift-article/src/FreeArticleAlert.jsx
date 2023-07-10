import { h } from '@financial-times/x-engine'

export const FreeArticleAlert = () => {
	return (
		<div
			id="free-article-alert"
			className="o-message o-message--alert o-message--received-highlights share-article-dialog__alert"
			data-o-component="o-message"
		>
			<div className="o-message__container">
				<div className="o-message__content">
					<p className="o-message__content-main">
						<strong>This is one of our free articles</strong>
						<br />
						Even non-subscribers can read it, without using up your sharing credits.
					</p>
				</div>
			</div>
		</div>
	)
}
