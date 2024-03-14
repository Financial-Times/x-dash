import { h } from '@financial-times/x-engine'
import { NoCreditAlert } from './NoCreditAlert'
import { RegisteredUserAlert } from './RegisteredUserAlert'
import { AdvancedSharingOptions } from './AdvancedSharingOptions'
import { canShareWithNonSubscribers, isNonSubscriberOption } from './lib/highlightsHelpers'

export const SharedLinkTypeSelector = (props) => {
	const {
		enterpriseEnabled,
		giftCredits,
		showNonSubscriberOptions,
		showAdvancedSharingOptions,
		isRegisteredUser
	} = props
	const _canShareWithNonSubscribers = canShareWithNonSubscribers(props)
	const _isNonSubscriberOption = isNonSubscriberOption(props)

	return (
		<div
			id="share-with-non-subscribers-checkbox"
			className={`o-forms-field o-forms-field--optional share-article-dialog__non-subscriber-checkbox ${
				enterpriseEnabled ? 'o-forms-field--professional' : ''
			}`}
			role="group"
			aria-labelledby="share-with-non-subscribers-checkbox"
		>
			{!_canShareWithNonSubscribers && _isNonSubscriberOption && !isRegisteredUser && (
				<NoCreditAlert>
					You’ve run out of sharing credits, which you need to share articles with non-subscribers. Use FT
					subscribers only option or{' '}
					<a
						href={`${enterpriseEnabled ? 'mailto:customer.success@ft.com' : 'mailto:help@ft.com'}`}
						rel="noreferrer"
						target="_blank"
						data-trackable="enterprise-out-of-credits"
					>
						contact support
					</a>
					.
				</NoCreditAlert>
			)}
			{isRegisteredUser && (
				<RegisteredUserAlert>
					Only FT subscribers will be able to see the full article using this link.{' '}
					<a
						className="o-typography-professional o-typography-link"
						href="https://subs.ft.com/"
						rel="noreferrer"
						target="_blank"
						data-trackable="enterprise-out-of-credits"
					>
						Subscribe
					</a>{' '}
					to share with non-subscribers.
				</RegisteredUserAlert>
			)}
			{showAdvancedSharingOptions && <AdvancedSharingOptions {...props} />}
			{!showAdvancedSharingOptions && showNonSubscriberOptions && giftCredits > 0 && !isRegisteredUser && (
				<div className="o-forms-input__label share-article-dialog__advanced-non-subscriber--element">
					<span className="share-article-dialog__advanced-sharing-options--element-description">
						Gift up to 20 articles per month to single non-subscribers. You have {giftCredits} articles left
						this month.
					</span>
				</div>
			)}
		</div>
	)
}
