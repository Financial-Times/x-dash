import { h } from '@financial-times/x-engine';
import { ShareType } from './lib/constants';
import styles from './GiftArticle.scss';

const radioSectionClassNames = [
	styles['o-forms-input'],
	styles['o-forms-input--radio-round'],
	styles['o-forms-input--inline'],
	styles['o-forms-field'],
	styles['radio-button-section']
].join(' ');

export default ({ shareType, showGiftUrlSection, showNonGiftUrlSection }) => (
	<div className={ radioSectionClassNames }>
		<label htmlFor="giftLink">
			<input
				type="radio"
				name="gift-form__radio"
				value="giftLink"
				id="giftLink"
				checked={ shareType === ShareType.gift }
				onChange={ showGiftUrlSection }
			/>
			<span className={ styles["o-forms-input__label"] }>
				with <strong>anyone</strong> (uses 1 gift credit)
			</span>
		</label>

		<label htmlFor="nonGiftLink">
			<input
				type="radio"
				name="gift-form__radio"
				value="nonGiftLink"
				id="nonGiftLink"
				checked={ shareType === ShareType.nonGift }
				onChange={ showNonGiftUrlSection }/>
			<span className={ styles["o-forms-input__label"] }>
				with <strong>other FT subscribers</strong>
			</span>
		</label>

	</div>
);
