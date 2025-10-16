import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'

export const Header = (props) => {
	const {
		title,
		isGiftUrlCreated,
		shareType,
		isNonGiftUrlShortened,
		showFreeArticleAlert,
		isMPRArticle,
		enterpriseEnabled,
		enterpriseRequestAccess
	} = props
	// when a gift link is created or shortened, the title is "Sharing link"
	if (
		isGiftUrlCreated ||
		(shareType === ShareType.nonGift && isNonGiftUrlShortened && !showFreeArticleAlert)
	) {
		return (
			<header>
				<h3 className="o3-type-body-highlight share-article-dialog__header-share-link-title">Sharing link</h3>
			</header>
		)
	}

	if (isMPRArticle) {
		return (
			<header>
				<h3 className="share-article-dialog__header">
					<span className="o3-type-body-highlight share-article-dialog__header-share-article-title">
						{enterpriseEnabled && !enterpriseRequestAccess
							? 'Share this article using:'
							: 'Share this article'}
					</span>
				</h3>
			</header>
		)
	}

	return (
		<header>
			<h3 className="share-article-dialog__header">
				<span className="o3-type-body-highlight share-article-dialog__header-share-article-title">
					{title}
				</span>
			</h3>
		</header>
	)
}
