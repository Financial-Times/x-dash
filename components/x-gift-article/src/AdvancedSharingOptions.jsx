import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
import { NoCreditAlert } from './NoCreditAlert'

export const AdvancedSharingOptions = (props) => {
	const { shareType, actions, enterpriseHasCredits, giftCredits, monthlyAllowance, isMPRArticle } = props

	const onValueChange = (event) => {
		if (event.target.value === ShareType.enterprise) {
			actions.showEnterpriseUrlSection(event)
		} else if (event.target.value === ShareType.gift) {
			actions.showGiftUrlSection(event)
		}
	}

	return giftCredits || enterpriseHasCredits ? (
		<div>
			<div
				className={`o-forms-field o-forms-field--optional o-forms-field--professional share-article-dialog__advanced-sharing-options ${
					isMPRArticle ? 'share-article-dialog__advanced-sharing-options--mpr' : ''
				}`}
				role="group"
			>
				{!isMPRArticle && (
					<h3 className="share-article-dialog__header">
						<span className="o3-type-body-highlight share-article-dialog__header-share-article-title">
							Share using:
						</span>
					</h3>
				)}

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
							<div className="o-forms-input__label share-article-dialog__advanced-sharing-options--element">
								<span className="o3-type-body-highlight">Advanced Sharing</span>
								<span className="o3-type-detail">Lets you share with multiple non-subscribers</span>
							</div>
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
							<div className="o-forms-input__label share-article-dialog__advanced-sharing-options--element">
								<span className="o3-type-body-highlight">Gift article</span>
								<span className="o3-type-detail">
									Gift up to {monthlyAllowance} articles per month to single non-subscribers. You have{' '}
									{giftCredits} articles left this month.
								</span>
							</div>
						</label>
					</span>
				</span>
			</div>
			{(!giftCredits || !enterpriseHasCredits) && (
				<NoCreditAlert>
					One of the choices is not available because you’ve run out of credits. Please use the other option.
				</NoCreditAlert>
			)}
		</div>
	) : null
}
