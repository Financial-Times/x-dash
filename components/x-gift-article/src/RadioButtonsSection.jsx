import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'

export default ({
	shareType,
	showGiftUrlSection,
	showEnterpriseUrlSection,
	showNonGiftUrlSection,
	enterpriseEnabled = false,
	enterpriseLimit = 100,
	enterpriseRequestAccess = false,
	enterpriseAlert = false
}) => (
	<div
		className="o-forms-input o-forms-input--radio-round o-forms-field x-gift-article__radio_buttons"
		role="group"
		aria-labelledby="article-share-options"
	>
		<span className="x-gift-article--visually-hidden" id="article-share-options">
			Article share options
		</span>

		{enterpriseEnabled === true && (
			<label htmlFor="enterpriseLink">
				<input
					type="radio"
					name="gift-form__radio"
					value="enterpriseLink"
					id="enterpriseLink"
					checked={shareType === ShareType.enterprise}
					onChange={showEnterpriseUrlSection}
				/>
				<span className="o-forms-input__label">
					{enterpriseLimit && !enterpriseRequestAccess
						? `Up to ${enterpriseLimit} recipients`
						: `Multiple recipients`}
					<span className="o-labels x-gift-article__enterprise-label">Enterprise</span>
					{enterpriseAlert && <span className="x-gift-article__enterprise-no-credits-icon"></span>}
				</span>
			</label>
		)}

		<label htmlFor="giftLink">
			<input
				type="radio"
				name="gift-form__radio"
				value="giftLink"
				id="giftLink"
				checked={shareType === ShareType.gift}
				onChange={showGiftUrlSection}
			/>
			<span className="o-forms-input__label">{enterpriseEnabled ? `Single recipient` : `with anyone`}</span>
		</label>

		<label htmlFor="nonGiftLink">
			<input
				type="radio"
				name="gift-form__radio"
				value="nonGiftLink"
				id="nonGiftLink"
				checked={shareType === ShareType.nonGift}
				onChange={showNonGiftUrlSection}
			/>
			<span className="o-forms-input__label">FT subscribers only</span>
		</label>
	</div>
)
