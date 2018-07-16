import { h } from '@financial-times/x-engine';

export default ({ displayGiftUrlSection, displayNonGiftUrlSection }) => (
	<div class="o-forms__group o-forms__group--inline">

		<input type="radio" name="gift-form__radio" value="giftLink" class="o-forms__radio" id="giftLink" defaultChecked onChange={ displayGiftUrlSection }/>
		<label htmlFor="giftLink" class="o-forms__label">with <strong>anyone</strong></label>

		<input type="radio" name="gift-form__radio" value="nonGiftLink" class="o-forms__radio" id="nonGiftLink" onChange={ displayNonGiftUrlSection }/>
		<label htmlFor="nonGiftLink" class="o-forms__label">with <strong>other subscribers</strong></label>

	</div>
);


// <div className="o-forms__group o-forms__group--inline">
//
// 	<div className="gift-form__radio-input">
// 		<input type="radio" name="gift-form__radio" value="giftLink" className="o-forms__radio" id="giftLink" defaultChecked ></input>
// 		<label htmlFor="giftLink" className="gift-form__label">
// 			<div className="o-forms__label"></div>
// 		</label>
// 	</div>
//
// 	<div className="gift-form__radio-input">
// 		<input type="radio" name="gift-form__radio" value="nonGiftLink" className="o-forms__radio" id="nonGiftLink" ></input>
// 		<label htmlFor="nonGiftLink" className="gift-form__label">
// 			<div className="o-forms__label"></div>
// 		</label>
// 	</div>
//
// </div>
