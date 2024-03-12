import { h } from '@financial-times/x-engine'

export const SharingOptionsToggler = (props) => {
	const {
		enterpriseEnabled,
		enterpriseRequestAccess,
		actions,
		enterpriseHasCredits,
		showAdvancedSharingOptions,
		showNonSubscriberOptions
	} = props

	const advancedSharingEnabled = enterpriseEnabled && !enterpriseRequestAccess
	const onValueChange = (event) => {
		if (advancedSharingEnabled) {
			if (event.target.value === 'anyone') {
				enterpriseHasCredits ? actions.showEnterpriseUrlSection(event) : actions.showGiftUrlSection(event)
				actions.showAdvancedSharingOptions()
			} else {
				actions.hideNonSubscriberSharingOptions(event)
				actions.setIncludeHighlights(false)
			}
			return
		}

		if (event.target.value === 'non-subscriber') {
			// if the checkbox is checked, the user wants to share the article with non-subscribers
			actions.showGiftUrlSection(event)
		} else {
			// if the checkbox is unchecked, the user wants to share the article with subscribers only
			actions.showNonGiftUrlSection(event)
		}
	}

	return (
		<div
			className={`o-forms-field o-forms-field--optional share-article-dialog__sharing-options-toggler ${
				enterpriseEnabled ? 'o-forms-field--professional' : ''
			}`}
			role="group"
			aria-labelledby="o-forms-labelledby_sharing-options"
			aria-describedby="o-forms-labelledby_sharing-options"
		>
			<span className="o-forms-input o-forms-input--saving o-forms-input--radio-box">
				<span className="o-forms-input--radio-box__container">
					{advancedSharingEnabled ? (
						<label htmlFor="share-with-anyone-people-radio">
							<input
								id="share-with-anyone-people-radio"
								name="share-option"
								type="radio"
								value="anyone"
								checked={showAdvancedSharingOptions}
								onChange={onValueChange}
							/>
							<span className="o-forms-input__label">Anyone</span>
						</label>
					) : (
						<label htmlFor="share-with-a-non-subscriber-radio">
							<input
								id="share-with-a-non-subscriber-radio"
								name="share-option"
								type="radio"
								value="non-subscriber"
								checked={showNonSubscriberOptions}
								onChange={onValueChange}
							/>
							<span className="o-forms-input__label">Non-subscriber</span>
						</label>
					)}
					<label htmlFor="share-with-one-person-radio">
						<input
							id="share-with-subscribers-radio"
							name="share-option"
							type="radio"
							value="subscribers"
							checked={!showAdvancedSharingOptions && !showNonSubscriberOptions}
							onChange={onValueChange}
						/>
						<span className="o-forms-input__label">FT subscribers only</span>
					</label>
				</span>
			</span>
		</div>
	)
}
