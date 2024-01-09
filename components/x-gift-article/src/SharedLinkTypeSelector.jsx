import { h } from '@financial-times/x-engine'
import { AdvancedSharingOptions } from './AdvancedSharingOptions'
import { ShareType } from './lib/constants'
import { NoCreditAlert } from './NoCreditAlert'

export const SharedLinkTypeSelector = (props) => {
	const {
		shareType,
		actions,
		enterpriseEnabled,
		enterpriseRequestAccess,
		showAdvancedSharingOptions,
		enterpriseHasCredits,
		giftCredits,
		hasHighlights,
		includeHighlights
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

	const includeHighlightsHandler = (event) => {
		actions.setIncludeHighlights(event.target.checked)
	}

	return (
		<div
			id="share-with-non-subscribers-checkbox"
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
					<span className="o-forms-input__label">
						{advancedSharingEnabled ? 'Give access to non-subscribers' : 'Give access to a non-subscriber'}
					</span>
				</label>
			</span>
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
			{hasHighlights && enterpriseEnabled && (
				<div className="o-forms-input o-forms-input--checkbox o-forms-field share-article-dialog__include-highlights">
					<label htmlFor="includeHighlights">
						<input
							type="checkbox"
							id="includeHighlights"
							name="includeHighlights"
							value={includeHighlights}
							checked={includeHighlights}
							onChange={includeHighlightsHandler}
							data-trackable="make-highlights-visible"
						/>
						<span className="o-forms-input__label x-gift-article__checkbox-span">Include highlights</span>
					</label>
				</div>
			)}
		</div>
	)
}
