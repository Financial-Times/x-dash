import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
import styles from './GiftArticle.scss'

const radioSectionClassNames = [
	styles['o-forms-input'],
	styles['o-forms-input--radio-round'],
	styles['o-forms-field'],
	styles['radio-button-section']
].join(' ')

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
	<div className={radioSectionClassNames} role="group" aria-labelledby="article-share-options">
		<span className={styles['share-option-title']} id="article-share-options">
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
				<span className={styles['o-forms-input__label']}>
					{enterpriseLimit && !enterpriseRequestAccess
						? `Up to ${enterpriseLimit} recipients`
						: `Multiple recipients`}
					<span className={[styles['o-labels'], styles['enterprise-label']].join(' ')}>Enterprise</span>
					{enterpriseAlert && <span className={styles['o-icons__enterprise-no-credits']}></span>}
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
			<span className={styles['o-forms-input__label']}>
				{enterpriseEnabled ? `Single recipient` : `with anyone`}
			</span>
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
			<span className={styles['o-forms-input__label']}>FT subscribers only</span>
		</label>
	</div>
)
