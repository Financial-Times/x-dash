import { h } from '@financial-times/x-engine'
import { ShareType } from '../lib/constants'

export const FooterMessage = ({
	shareType,
	isGiftUrlCreated,
	redemptionLimit,
	enterpriseLimit,
	giftCredits,
	isNonGiftUrlShortened,
	enterpriseEnabled,
	enterpriseRequestAccess,
	includeHighlights,
	isFreeArticle,
	showFreeArticleAlert
}) => {
	// if the share link button has not been clicked yet
	if (!isGiftUrlCreated && !isNonGiftUrlShortened) {
		// when the user is b2b and has advanced sharing enabled
		if (enterpriseEnabled && !enterpriseRequestAccess) {
			return (
				<div className="share-article-dialog__footer-message">
					<a
						className="o-typography-professional o-typography-link share-article-dialog__footer-message"
						href="https://enterprise.ft.com/ft-enterprise-sharing-trial"
						target="_blank"
						rel="noreferrer"
					>
						Tell me more about Advanced Sharing
					</a>
				</div>
			)
		}

		return enterpriseEnabled ? ( // when the user is b2b
			<p className="share-article-dialog__footer-message">
				Send to multiple people with{' '}
				<a
					className="o-typography-professional o-typography-link"
					href="https://enterprise.ft.com/ft-enterprise-sharing-trial"
					target="_blank"
					rel="noreferrer"
				>
					Advanced Sharing
				</a>
			</p>
		) : null // when the user is b2c
	}

	// when the share link has been created

	if (isFreeArticle) {
		return !showFreeArticleAlert ? (
			<p className="share-article-dialog__footer-message-shared-link">
				Anyone will be able to see the full article using this link.
			</p>
		) : null
	}

	if (shareType === ShareType.gift) {
		const redemptionLimitUnit = redemptionLimit === 1 ? 'time' : 'times'
		const creditUnit = giftCredits === 1 ? 'credit' : 'credits'
		const redemptionLimitMessage = `Link can be viewed ${redemptionLimit} ${redemptionLimitUnit} and is valid for 90 days.`
		const creditsMessage = `You still have ${giftCredits} ${creditUnit} left this month.`

		return (
			<div className="share-article-dialog__footer-message-shared-link">
				<p>{redemptionLimitMessage}</p>
				<p>{creditsMessage}</p>
			</div>
		)
	}

	if (shareType === ShareType.nonGift) {
		return (
			<p className="share-article-dialog__footer-message-shared-link">
				Only FT subscribers will be able to see the full article using this link.
			</p>
		)
	}

	if (shareType === ShareType.enterprise) {
		const advancedSharingLimitUnit = enterpriseLimit === 1 ? 'time' : 'times'
		const advancedSharingLimitMessage = `Link can be viewed ${enterpriseLimit} ${advancedSharingLimitUnit}. ${
			includeHighlights ? 'Your highlights will be visible to recipients.' : ''
		}`

		return (
			<div className="share-article-dialog__footer-message-shared-link">
				<p>{advancedSharingLimitMessage}</p>
				<p>
					We’ve added this link to your list.{' '}
					<a
						className="o-typography-professional o-typography-link"
						href="https://enterprise-sharing-dashboard.ft.com"
						target="_blank"
						rel="noreferrer"
					>
						See all shared links
					</a>
				</p>
			</div>
		)
	}

	return null
}
