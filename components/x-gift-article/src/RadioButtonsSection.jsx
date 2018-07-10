import { h } from '@financial-times/x-engine';

export default ({ displayGiftUrlSection, displayNonGiftUrlSection }) => (
	<div className="gift-form__radio-group">

		<div className="gift-form__radio-input">
			<input type="radio" name="gift-form__radio" value="giftLink" className="gift-form__radio" id="giftLink" defaultChecked onChange={ displayGiftUrlSection }></input>
			<label htmlFor="giftLink" className="gift-form__label">
				<div className="gift-form__label">with <strong>anyone</strong></div>
			</label>
		</div>

		<div className="gift-form__radio-input">
			<input type="radio" name="gift-form__radio" value="nonGiftLink" className="gift-form__radio" id="nonGiftLink" onChange={ displayNonGiftUrlSection }></input>
			<label htmlFor="nonGiftLink" className="gift-form__label">
				<div className="gift-form__label">with <strong>other subscribers</strong></div>
			</label>
		</div>

	</div>
);
