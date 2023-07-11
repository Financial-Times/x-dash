import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
import { NoCreditAlert } from './NoCreditAlert'
import { ReceivedHighlightsAlert } from './ReceivedHighlightsAlert'

export const AdvancedSharingOptions = (props) => {
	const {
		shareType,
		actions,
		showHighlightsCheckbox,
		includeHighlights,
		enterpriseHasCredits,
		giftCredits,
		showHighlightsRecipientMessage,
		hasHighlights
	} = props
	const onValueChange = (event) => {
		if (event.target.value === ShareType.enterprise) {
			actions.showEnterpriseUrlSection(event)
		} else if (event.target.value === ShareType.gift) {
			actions.showGiftUrlSection(event)
			actions.setIncludeHighlights(false)
		}
	}

	const includeHighlightsHandler = (event) => {
		actions.setIncludeHighlights(event.target.checked)
	}

	return (
		<div>
			<div
				className="o-forms-field o-forms-field--optional o-forms-field--professional share-article-dialog__advanced-sharing-options"
				role="group"
				aria-labelledby="radio-group-title"
			>
				<span className="o-forms-input o-forms-input--radio-round">
					<span className="o-forms-input--radio-round__container">
						<label htmlFor="share-with-multiple-people-radio">
							<input
								id="share-with-multiple-people-radio"
								name="share-with-multiple-people-radio"
								type="radio"
								value={ShareType.enterprise}
								checked={shareType === ShareType.enterprise}
								onChange={onValueChange}
								disabled={!enterpriseHasCredits}
							/>
							<span className="o-forms-input__label">Multiple people</span>
						</label>
						<label htmlFor="share-with-one-person-radio">
							<input
								id="share-with-one-person-radio"
								name="share-with-one-person-radio"
								type="radio"
								value={ShareType.gift}
								checked={shareType === ShareType.gift}
								onChange={onValueChange}
								disabled={!giftCredits}
							/>
							<span className="o-forms-input__label">One person</span>
						</label>
					</span>
				</span>
			</div>
			{(!giftCredits || !enterpriseHasCredits) && (
				<NoCreditAlert>
					One of the non-subscriber choices is not available because you’ve run out of credits. Please use the
					other option.
				</NoCreditAlert>
			)}
			{showHighlightsRecipientMessage && <ReceivedHighlightsAlert {...props} />}
			{showHighlightsCheckbox && hasHighlights && (
				<div className="o-forms-input o-forms-input--checkbox o-forms-field share-article-dialog__include-highlights">
					<label htmlFor="includeHighlights">
						<input
							type="checkbox"
							id="includeHighlights"
							name="includeHighlights"
							value={includeHighlights}
							checked={includeHighlights}
							onChange={includeHighlightsHandler}
							disabled={shareType !== ShareType.enterprise}
							data-trackable="make-highlights-visible"
						/>
						<span className="o-forms-input__label x-gift-article__checkbox-span">Include highlights</span>
					</label>
				</div>
			)}
		</div>
	)
}
