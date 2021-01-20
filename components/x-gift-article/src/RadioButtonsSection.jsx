import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
import styles from './GiftArticle.scss'

const radioSectionClassNames = [
	styles['o-forms-input'],
	styles['o-forms-input--radio-round'],
	styles['o-forms-input--inline'],
	styles['o-forms-field'],
	styles['radio-button-section']
].join(' ')

export default ({ shareType, showGiftUrlSection, showNonGiftUrlSection }) => (
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
				checked={shareType === ShareType.gift}
				onChange={showGiftUrlSection}
			/>
			<span className={styles['o-forms-input__label']}>
				Gift to <strong>anyone</strong> (uses <strong>1 credit</strong>)
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
			<span className={styles['o-forms-input__label']}>
				Share with <strong>other FT subscribers</strong>
			</span>
		</label>
	</div>
)
