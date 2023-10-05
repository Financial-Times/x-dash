import { h } from '@financial-times/x-engine'
import { Header } from './Header'
import { GiftLinkSection } from './GiftLinkSection'
import { Footer } from './Footer'
import { AdvancedSharingBanner } from './AdvancedSharingBanner'

export default (props) => {
	return (
		<div
			className="o-typography-wrapper share-article-dialog__wrapper"
			hidden={props.isLoading}
			data-trackable={`share-modal | ${
				props.enterpriseEnabled && !props.enterpriseRequestAccess ? 'b2b' : 'b2c'
			}`}
			aria-modal="true"
		>
			<div className="o-overlay__close" />
			<AdvancedSharingBanner {...props} />
			<main className="share-article-dialog__main">
				<Header {...props} />
				<GiftLinkSection {...props} />
				<Footer {...props} />
			</main>
		</div>
	)
}
