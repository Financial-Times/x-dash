import { h } from '@financial-times/x-engine';
import styles from './GiftArticle.css';

const boldTextClassName = styles.bold;
const radioSectionClassNames = [
	'o-forms__group',
	'o-forms__group--inline',
	styles['radio-button-section']
].join(' ');

export default ({ displayGiftUrlSection, displayNonGiftUrlSection }) => (
	<div className={ radioSectionClassNames }>

		<input type="radio" name="gift-form__radio" value="giftLink" className="o-forms__radio" id="giftLink" defaultChecked onChange={ displayGiftUrlSection }/>
		<label htmlFor="giftLink" className="o-forms__label">with <span className={ boldTextClassName }>anyone</span></label>

		<input type="radio" name="gift-form__radio" value="nonGiftLink" className="o-forms__radio" id="nonGiftLink" onChange={ displayNonGiftUrlSection }/>
		<label htmlFor="nonGiftLink" className="o-forms__label">with <span className={ boldTextClassName }>other subscribers</span></label>

	</div>
);
