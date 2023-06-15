import { h } from '@financial-times/x-engine'
import { Header } from './Header'
import { GiftLinkSection } from './GiftLinkSection'
import { Footer } from './Footer'

export default (props) => {
	return (
		<div className="o-typography-wrapper share-article-dialog__wrapper">
			{/*todo use the enterpriseEnabled field to add the Advanced Sharing top banner*/}
			<Header {...props} />
			<GiftLinkSection {...props} />
			<Footer {...props} />
		</div>
	)
}
