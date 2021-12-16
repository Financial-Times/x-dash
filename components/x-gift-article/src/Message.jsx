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
	invalidResponseFromApi,
	isArticleSharingUxUpdates,
	enterpriseLimit,
	enterpriseHasCredits,
	enterpriseRequestAccess,
	enterpriseFirstTimeUser
}) => {
	if (isArticleSharingUxUpdates) {
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

			if (invalidResponseFromApi) {
				return <div className={messageClassName}>Unable to fetch gift credits. Please try again later</div>
			}

			return (
				<div className={messageClassName}>
					A gift link can be opened up to <strong>{redemptionLimit ? redemptionLimit : 3} times</strong>
				</div>
			)
		}

		if (shareType === ShareType.nonGift) {
			return <div className={messageClassName}>This link can only be read by existing subscribers</div>
		}
	}

	if (isFreeArticle) {
		return (
			<div className={messageClassName}>
				This article is currently <strong>free</strong> for anyone to read
			</div>
		)
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
			return (
				<div className={messageClassName}>
					This link can be opened up to {redemptionLimit} times and is valid for 90 days
				</div>
			)
		}

		if (invalidResponseFromApi) {
			return <div className={messageClassName}>Unable to fetch gift credits. Please try again later</div>
		}

		return (
			<div className={messageClassName}>
				Uses 1 gift credit. You have{' '}
				<strong>
					{giftCredits} gift article {giftCredits === 1 ? 'credit' : 'credits'}
				</strong>{' '}
				left this month
			</div>
		)
	}

	if (shareType === ShareType.enterprise) {
		if (isGiftUrlCreated === true) {
			return (
				<div className={messageClassName}>
					This link can be opened by up to {enterpriseLimit} people and is valid for 90 days
				</div>
			)
		}
		if (enterpriseHasCredits === true) {
			if (enterpriseFirstTimeUser) {
				return (
					<div className={styles['enterprise-message']}>
						<h4>Engage more effectively with clients and colleagues.</h4>
						<p>
							Enterprise Sharing lets members of your organisation share FT article links with up to 100
							people, even if they don’t have a FT subscription.
						</p>
					</div>
				)
			}
			return (
				<div className={messageClassName}>
					Your organisation has <strong>Enterprise Sharing credits</strong> available for you to use
				</div>
			)
		} else {
			if (enterpriseRequestAccess) {
				//Activation Message
				return (
					<div className={styles['enterprise-message']}>
						<h4>Engage more effectively with clients and colleagues.</h4>
						<p>
							Enterprise Sharing lets members of your organisation share FT article links with up to 100
							people, even if they don't have a FT subscription.
						</p>
						<a
							href="https://enterprise.ft.com/ft-enterprise-sharing-request-access/?segmentId=c87259e0-7073-3ea8-7f83-b988f05c3f94"
							target="_blank"
							rel="noreferrer"
							className={styles['buttonBaseStyle']}
						>
							Request Access
						</a>
					</div>
				)
			}
			return (
				<div className={styles['enterprise-message']}>
					<h4>Your organisation has run out of share credits.</h4>
					<p>
						Request more credits and our Enterprise team will get in touch with the admin of your FT
						subscription to arrange a top-up of sharing credits.
					</p>
					<a
						href="https://enterprise.ft.com/ft-enterprise-sharing-request-access/?segmentId=c87259e0-7073-3ea8-7f83-b988f05c3f94"
						target="_blank"
						rel="noreferrer"
						className={styles['buttonBaseStyle']}
						type="button"
					>
						Request more credits
					</a>
				</div>
			)
		}
	}

	if (shareType === ShareType.nonGift) {
		return <div className={messageClassName}>This link can only be read by existing subscribers</div>
	}
}
