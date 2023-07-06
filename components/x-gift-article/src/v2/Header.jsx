import { h } from '@financial-times/x-engine'
import { ShareType } from '../lib/constants'

export const Header = ({
	title,
	article,
	isGiftUrlCreated,
	shareType,
	isNonGiftUrlShortened,
	showFreeArticleAlert
}) => {
	// when a gift link is created or shortened, the title is "Sharing link"
	if (
		isGiftUrlCreated ||
		(shareType === ShareType.nonGift && isNonGiftUrlShortened && !showFreeArticleAlert)
	) {
		return (
			<header>
				<div className="share-article-dialog__header-share-link-title">Sharing link</div>
			</header>
		)
	}

	// when a gift link is not created, the title should be "Share this article:"
	return (
		<header>
			<h5 className="share-article-dialog__header-share-article-title">{title}</h5>
			<h2 className="share-article-dialog__header-article-title">{article.title}</h2>
		</header>
	)
}
