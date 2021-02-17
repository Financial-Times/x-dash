import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
import styles from './AdvancedSharing.scss'

const radioSectionClassNames = [
	styles['o-forms-input'],
	styles['o-forms-input--radio-round'],
	styles['o-forms-input--inline'],
	styles['o-forms-field'],
	styles['radio-button-section']
].join(' ')

export default ({ shareType, showAdvancedSharingUrlSection, showNonGiftUrlSection, userOrganisation }) => (
	<div className={radioSectionClassNames} role="group" aria-labelledby="article-share-options">
		<span className={styles['share-option-title']} id="article-share-options">
			Article share options
		</span>
		<label htmlFor="giftLink">
			<input
				type="radio"
				name="gift-form__radio"
				value="giftLink"
				id="giftLink"
				checked={shareType === ShareType.internal}
				onChange={showAdvancedSharingUrlSection}
			/>
			<span className={styles['o-forms-input__label']}>Othe {userOrganisation} employees</span>
		</label>

		<label htmlFor="nonGiftLink">
			<input
				type="radio"
				name="gift-form__radio"
				value="nonGiftLink"
				id="nonGiftLink"
				checked={shareType === ShareType.external}
				onChange={showNonGiftUrlSection}
			/>
			<span className={styles['o-forms-input__label']}>External to {userOrganisation}</span>
		</label>
	</div>
)
