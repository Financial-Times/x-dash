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
	enterpriseAlert = false,
	isFreeArticle = false
}) => {
	const enterpriseField = () => (
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
				{enterpriseAlert && <span className="x-gift-article__enterprise-no-credits-icon"></span>}
			</span>
		</label>
	)

	const giftField = () => (
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
	)

	const nonGiftField = () => (
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
	)

	const freeToReadField = () => (
		<label htmlFor="nonGiftLink">
			<input
				type="radio"
				name="gift-form__radio"
				value="nonGiftLink"
				id="nonGiftLink"
				checked={shareType === ShareType.nonGift}
				onChange={showNonGiftUrlSection}
			/>
			<span className="o-forms-input__label">with anyone</span>
		</label>
	)

	// If the article is free and Enterprise Sharing is enabled, display the radio buttons.
	if (isFreeArticle && enterpriseEnabled) {
		return (
			<div
				className="o-forms-input o-forms-input--radio-round o-forms-field x-gift-article__radio_buttons"
				role="group"
				aria-labelledby="article-share-options"
			>
				<span className="x-gift-article--visually-hidden" id="article-share-options">
					Article share options
				</span>
				{freeToReadField()}
				{enterpriseField()}
			</div>
		)
	}

	// If the article is not free, display the radio buttons with conditional options depending
	// on whether or not Enterprise Sharing is enabled.
	if (!isFreeArticle) {
		return (
			<div
				className="o-forms-input o-forms-input--radio-round o-forms-field x-gift-article__radio_buttons"
				role="group"
				aria-labelledby="article-share-options"
			>
				<span className="x-gift-article--visually-hidden" id="article-share-options">
					Article share options
				</span>
				{enterpriseEnabled ? (
					<div>
						{enterpriseField()}
						{giftField()}
						{nonGiftField()}
					</div>
				) : (
					<div>
						{giftField()}
						{nonGiftField()}
					</div>
				)}
			</div>
		)
	}

	// If the article is free but Enterprise Sharing is NOT enabled, do not display the radio buttons.
	// They're not required because there's only one available sharing option in this case.
	return null
}
