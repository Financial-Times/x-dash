import { h } from '@financial-times/x-engine'
import { ShareType } from '../lib/constants'

export const SharedLinkTypeSelector = ({ shareType, actions, enterpriseEnabled }) => {
	const handleChange = (event) => {
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
			className={`o-forms-field o-forms-field--optional ${
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
						checked={shareType === ShareType.gift}
						onChange={handleChange}
					/>
					<span className="o-forms-input__label">Give access to non-subscribers</span>
				</label>
			</span>
		</div>
	)
}
