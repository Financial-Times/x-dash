import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
import styles from './GiftArticle.scss'

const messageClassName = styles.message

export default ({
	shareType,
	isGiftUrlCreated,
	isFreeArticle,
	giftCredits,
	monthlyAllowance,
	nextRenewalDateText,
	redemptionLimit,
	invalidResponseFromApi
}) => {
	if (isFreeArticle) {
		return null
	}

	if (shareType === ShareType.gift) {
		if (giftCredits === 0) {
			return (
				<div className={messageClassName}>
					You’ve used all your <strong>gift article credits</strong>
					<br />
					You’ll get your next {monthlyAllowance} on <strong>{nextRenewalDateText}</strong>
				</div>
			)
		}

		if (isGiftUrlCreated) {
			return <div className={messageClassName}>This link can be opened up to {redemptionLimit} times</div>
		}

		if (invalidResponseFromApi) {
			return <div className={messageClassName}>Unable to fetch gift credits. Please try again later</div>
		}

		return (
			<div className={messageClassName}>
				A gift link can be <strong>opened up to {redemptionLimit} times</strong>
			</div>
		)
	}

	if (shareType === ShareType.nonGift) {
		return <div className={messageClassName}>This link can only be read by existing subscribers</div>
	}
}
