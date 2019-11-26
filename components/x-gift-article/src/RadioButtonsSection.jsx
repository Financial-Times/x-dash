import { h } from '@financial-times/x-engine';
import { ShareType } from './lib/constants';
import styles from './GiftArticle.scss';

const boldTextClassName = styles.bold;
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
				className="o-forms__radio"
				id="giftLink"
				checked={ shareType === ShareType.gift }
				onChange={ showGiftUrlSection }
			/>
			<span className={ styles["o-forms-input__label"] }>
				with <span className={ boldTextClassName }>anyone</span> (uses 1 gift credit)
			</span>
		</label>

		<label htmlFor="nonGiftLink">
			<input
				type="radio"
				name="gift-form__radio"
				value="nonGiftLink"
				className="o-forms__radio"
				id="nonGiftLink"
				checked={ shareType === ShareType.nonGift }
				onChange={ showNonGiftUrlSection }/>
			<span className={ styles["o-forms-input__label"] }>
				with <span className={ boldTextClassName }>other FT subscribers</span>
			</span>
		</label>

	</div>
);
