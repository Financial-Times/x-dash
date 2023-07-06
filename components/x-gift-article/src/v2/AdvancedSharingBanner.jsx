import { h } from '@financial-times/x-engine'
export const AdvancedSharingBanner = ({ enterpriseEnabled, enterpriseRequestAccess }) => {
	// show banner only if user is b2b and has advanced sharing enabled
	return enterpriseEnabled && !enterpriseRequestAccess ? (
		<div>
			<div className="share-article-dialog__banner-strip" />
			<h4 className="share-article-dialog__banner-title">Advanced Sharing</h4>
		</div>
	) : null
}
