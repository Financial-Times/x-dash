import { h } from '@financial-times/x-engine'
import Title from './Title'

export default ({ mobileShareLinks }) => (
	<div className="x-gift-article-mobile-share-buttons">
		<Title title="Share on Social" />
		<div className="x-gift-article-mobile-share-buttons__inner">
			<span className="x-gift-article-mobile-share-buttons__button" data-share="facebook">
				<a
					className="x-gift-article-mobile-share-buttons--facebook"
					rel="noopener"
					href={mobileShareLinks.facebook}
					data-trackable="facebook"
				>
					Facebook{' '}
					<span className="x-gift-article-mobile-share-buttons__hidden-button-text">(opens new window)</span>
				</a>
			</span>
			<span className="x-gift-article-mobile-share-buttons__button" data-share="twitter">
				<a
					className="x-gift-article-mobile-share-buttons--twitter"
					rel="noopener"
					href={mobileShareLinks.twitter}
					data-trackable="twitter"
				>
					Twitter{' '}
					<span className="x-gift-article-mobile-share-buttons__hidden-button-text">(opens new window)</span>
				</a>
			</span>
			<span className="x-gift-article-mobile-share-buttons__button" data-share="linkedin">
				<a
					className="x-gift-article-mobile-share-buttons--linkedin"
					rel="noopener"
					href={mobileShareLinks.linkedin}
					data-trackable="linkedin"
				>
					LinkedIn{' '}
					<span className="x-gift-article-mobile-share-buttons__hidden-button-text">(opens new window)</span>
				</a>
			</span>
			<span className="x-gift-article-mobile-share-buttons__button" data-share="whatsapp">
				<a
					className="x-gift-article-mobile-share-buttons--whatsapp"
					rel="noopener"
					href={mobileShareLinks.whatsapp}
					data-trackable="whatsapp"
				>
					Whatsapp{' '}
					<span className="x-gift-article-mobile-share-buttons__hidden-button-text">(opens new window)</span>
				</a>
			</span>
		</div>
	</div>
)
