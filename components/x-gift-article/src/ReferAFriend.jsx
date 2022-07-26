import { h } from '@financial-times/x-engine'
import { UrlType } from './lib/constants'

export default ({ rafTitle, rafDescription, urls, actions }) => {
	return (
		<div className="x-gift-article--raf">
			<h4>{rafTitle}</h4>
			<p>{rafDescription}</p>
			<div
				className="js-gift-article__url-section x-gift-article__url-section"
				data-section-id={UrlType.raf + 'Link'}
				data-trackable={UrlType.raf + 'Link'}
			>
				<span className="o-forms-input o-forms-input--text">
					<input
						type="text"
						name={UrlType.raf}
						value={urls.raf}
						className="x-gift-article__url-input"
						readOnly
						aria-label="Gift free subscription shareable link"
					/>
				</span>
				<div className="x-gift-article__buttons">
					<button
						className="js-copy-link x-gift-article__button x-gift-article-button--gap"
						type="button"
						onClick={actions.copyRafUrl}
						aria-label="Copy the free subscription link to your clipboard"
					>
						Copy link
					</button>
				</div>
			</div>
		</div>
	)
}
