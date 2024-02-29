import { h } from '@financial-times/x-engine'
import { NoCreditAlert } from './NoCreditAlert'
import { AdvancedSharingOptions } from './AdvancedSharingOptions'

export const SharedLinkTypeSelector = (props) => {
	const {
		enterpriseEnabled,
		enterpriseHasCredits,
		giftCredits,

		showAdvancedSharingOptions
	} = props
	const canShareWithNonSubscribers = giftCredits > 0 || enterpriseHasCredits
	return (
		<div
			id="share-with-non-subscribers-checkbox"
			className={`o-forms-field o-forms-field--optional share-article-dialog__non-subscriber-checkbox ${
				enterpriseEnabled ? 'o-forms-field--professional' : ''
			}`}
			role="group"
			aria-labelledby="share-with-non-subscribers-checkbox"
		>
			{!canShareWithNonSubscribers && (
				<NoCreditAlert>
					You’ve run out of sharing credits for non-subscribers. You can still share it with FT subscribers
					via a link or{' '}
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
			{showAdvancedSharingOptions && <AdvancedSharingOptions {...props} />}
		</div>
	)
}
