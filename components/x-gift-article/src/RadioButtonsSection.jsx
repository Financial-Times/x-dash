import { h } from '@financial-times/x-engine';
import { ShareType } from './lib/constants';
import styles from './GiftArticle.css';

const boldTextClassName = styles.bold;
const radioSectionClassNames = [
	'o-forms__group',
	'o-forms__group--inline',
	styles['radio-button-section']
].join(' ');

export default ({ shareType, showGiftUrlSection, showNonGiftUrlSection }) => (
	<div className={ radioSectionClassNames }>

		<input
			type="radio"
			name="gift-form__radio"
			value="giftLink"
			className="o-forms__radio"
			id="giftLink"
			checked={ shareType === ShareType.gift }
			onChange={ showGiftUrlSection }
		/>

		<label htmlFor="giftLink" className="o-forms__label">
			with <span className={ boldTextClassName }>anyone</span> (uses 1 gift credit)
		</label>

		<input
			type="radio"
			name="gift-form__radio"
			value="nonGiftLink"
			className="o-forms__radio"
			id="nonGiftLink"
			checked={ shareType === ShareType.nonGift }
			onChange={ showNonGiftUrlSection }/>

		<label htmlFor="nonGiftLink" className="o-forms__label">
			with <span className={ boldTextClassName }>other FT subscribers</span>
		</label>

	</div>
);
