import { h } from '@financial-times/x-engine';
import { SHARE_TYPE_GIFT, SHARE_TYPE_NON_GIFT } from './lib/constants';
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
			checked={ shareType === SHARE_TYPE_GIFT }
			onChange={ showGiftUrlSection }/>

		<label htmlFor="giftLink" className="o-forms__label">
			with <span className={ boldTextClassName }>anyone</span>
		</label>

		<input
			type="radio"
			name="gift-form__radio"
			value="nonGiftLink"
			className="o-forms__radio"
			id="nonGiftLink"
			checked={ shareType === SHARE_TYPE_NON_GIFT }
			onChange={ showNonGiftUrlSection }/>

		<label htmlFor="nonGiftLink" className="o-forms__label">
			with <span className={ boldTextClassName }>other subscribers</span>
		</label>

	</div>
);
