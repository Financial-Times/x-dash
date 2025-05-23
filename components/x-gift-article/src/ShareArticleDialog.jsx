import { h } from '@financial-times/x-engine'
import { Header } from './Header'
import { GiftLinkSection } from './GiftLinkSection'
import { Footer } from './Footer'
import { SharingOptionsToggler } from './SharingOptionsToggler'
import { ShareType } from './lib/constants'

export default (props) => {
	const {
		isGiftUrlCreated,
		shareType,
		isNonGiftUrlShortened,
		showFreeArticleAlert,
		isFreeArticle,
		enterpriseEnabled,
		enterpriseRequestAccess,
		isRegisteredUser,
		isMPRArticle
	} = props

	return (
		<div
			className="o-typography-wrapper o3-box-sizing-border-box share-article-dialog__wrapper"
			hidden={props.isLoading}
			data-trackable={`share-modal | ${enterpriseEnabled && !enterpriseRequestAccess ? 'b2b' : 'b2c'}`}
			role="dialog"
			aria-modal="true"
		>
			<button className="share-article-modal__close" aria-label="Close" />
			<div className="share-article-dialog__main">
				<Header {...props} />
				{!isFreeArticle &&
				!(
					isMPRArticle ||
					isGiftUrlCreated ||
					isRegisteredUser ||
					(shareType === ShareType.nonGift && isNonGiftUrlShortened && !showFreeArticleAlert)
				) ? (
					<SharingOptionsToggler {...props} />
				) : null}
				<GiftLinkSection {...props} />
				<Footer {...props} />
			</div>
		</div>
	)
}
