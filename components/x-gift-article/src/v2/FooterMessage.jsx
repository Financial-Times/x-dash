import { h } from '@financial-times/x-engine'
import { ShareType } from '../lib/constants'

export const FooterMessage = ({
	shareType,
	isGiftUrlCreated,
	redemptionLimit,
	giftCredits,
	isNonGiftUrlShortened,
	enterpriseEnabled
}) => {
	if (!isGiftUrlCreated && !isNonGiftUrlShortened) {
		return enterpriseEnabled ? (
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

	return null
}
