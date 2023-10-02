import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'

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
				<h3 className="share-article-dialog__header_share-link-title">Sharing link</h3>
			</header>
		)
	}

	// when a gift link is not created, the title should be "Share this article:"
	return (
		<header>
			<h3 className="share-article-dialog__header">
				<span className="share-article-dialog__header_share-article-title">{title}</span>
				<span className="share-article-dialog__header_article-title">{article.title}</span>
			</h3>
		</header>
	)
}
