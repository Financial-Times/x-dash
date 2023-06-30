import { h } from '@financial-times/x-engine'
import { AdvancedSharingOptions } from './AdvancedSharingOptions'
import { ShareType } from '../lib/constants'
import { NoCreditAlert } from './NoCreditAlert'

export const SharedLinkTypeSelector = (props) => {
	const {
		shareType,
		actions,
		enterpriseEnabled,
		enterpriseRequestAccess,
		showAdvancedSharingOptions,
		enterpriseHasCredits,
		giftCredits
	} = props
	const advancedSharingEnabled = enterpriseEnabled && !enterpriseRequestAccess
	const canShareWithNonSubscribers = giftCredits > 0 || enterpriseHasCredits

	const handleChange = (event) => {
		if (advancedSharingEnabled) {
			if (event.target.checked) {
				enterpriseHasCredits ? actions.showEnterpriseUrlSection(event) : actions.showGiftUrlSection(event)
				actions.showAdvancedSharingOptions()
			} else {
				actions.hideAdvancedSharingOptions(event)
				actions.setIncludeHighlights(false)
			}
			return
		}

		if (event.target.checked) {
			// if the checkbox is checked, the user wants to share the article with non-subscribers
			actions.showGiftUrlSection(event)
		} else {
			// if the checkbox is unchecked, the user wants to share the article with subscribers only
			actions.showNonGiftUrlSection(event)
		}
	}

	return (
		<div
			className={`o-forms-field o-forms-field--optional share-article-dialog__non-subscriber-checkbox ${
				enterpriseEnabled ? 'o-forms-field--professional' : ''
			}`}
			role="group"
			aria-labelledby="share-with-non-subscribers-checkbox"
		>
			<span className="o-forms-input o-forms-input--checkbox">
				<label htmlFor="share-with-non-subscribers-checkbox">
					<input
						className="o-forms-field--professional"
						id="share-with-non-subscribers-checkbox"
						name="share-with-non-subscribers-checkbox"
						type="checkbox"
						checked={shareType === ShareType.gift || showAdvancedSharingOptions}
						onChange={handleChange}
						disabled={!canShareWithNonSubscribers}
					/>
					<span className="o-forms-input__label">Give access to non-subscribers</span>
				</label>
			</span>
			{!canShareWithNonSubscribers && (
				<NoCreditAlert>
					You’ve run out of sharing credits, which you need to share articles with FT non-subscribers. Use
					another option or{' '}
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
