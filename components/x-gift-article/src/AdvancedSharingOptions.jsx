import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
import { NoCreditAlert } from './NoCreditAlert'
import { ReceivedHighlightsAlert } from './ReceivedHighlightsAlert'

export const AdvancedSharingOptions = (props) => {
	const { shareType, actions, enterpriseHasCredits, giftCredits, showHighlightsRecipientMessage } = props
	const onValueChange = (event) => {
		if (event.target.value === ShareType.enterprise) {
			actions.showEnterpriseUrlSection(event)
		} else if (event.target.value === ShareType.gift) {
			actions.showGiftUrlSection(event)
		}
	}

	return (
		<div>
			<div
				className="o-forms-field o-forms-field--optional o-forms-field--professional share-article-dialog__advanced-sharing-options"
				role="group"
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
		</div>
	)
}
