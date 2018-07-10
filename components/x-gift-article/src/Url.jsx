import { h } from '@financial-times/x-engine';

export default ({ isGift, isGiftUrlCreated, url }) => {

	if (!isGift || isGiftUrlCreated) {
		return (
			<div className="gift-form__link-input">
				<input type="text" name="example-gift-link" value={ url } className="gift-form__text-input"></input>
			</div>
		);
	}

	return (
		<div className="gift-form__link-input">
			<input type="text" name="example-gift-link" value={ url } className="gift-form__text-input"  disabled='disabled'></input>
		</div>
	);

};
