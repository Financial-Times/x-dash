import { h } from '@financial-times/x-engine'
import { Header } from './Header'
import { GiftLinkSection } from './GiftLinkSection'
import { Footer } from './Footer'
import { AdvancedSharingBanner } from './AdvancedSharingBanner'

export default (props) => {
	return (
		<div className="o-typography-wrapper share-article-dialog__wrapper">
			<AdvancedSharingBanner {...props} />
			<main className="share-article-dialog__main">
				<Header {...props} />
				<GiftLinkSection {...props} />
				<Footer {...props} />
			</main>
		</div>
	)
}
