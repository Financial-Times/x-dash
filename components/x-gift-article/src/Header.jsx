import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'

export const Header = ({ isGiftUrlCreated, shareType, isNonGiftUrlShortened, showFreeArticleAlert }) => {
	// when a gift link is created or shortened, the title is "Sharing link"
	if (
		isGiftUrlCreated ||
		(shareType === ShareType.nonGift && isNonGiftUrlShortened && !showFreeArticleAlert)
	) {
		return (
			<header>
				<h3 className="share-article-dialog__header-share-link-title">Sharing link</h3>
			</header>
		)
	}

	// when a gift link is not created, the title should be "Share this article:"
	return (
		<header>
			<h3 className="share-article-dialog__header">
				<span className="share-article-dialog__header-share-article-title">Share this article with:</span>
			</h3>
			<div className="o-buttons-group">
				<button className="o-buttons o-buttons--primary o-buttons--professional">Non-subscriber</button>
				<button className="o-buttons o-buttons--secondary o-buttons--professional">
					FT subscribers only
				</button>
			</div>
		</header>
	)
}
