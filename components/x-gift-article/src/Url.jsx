import { h } from '@financial-times/x-engine';

export default ({ isGift, isGiftUrlCreated, url }) => {

	if (!isGift || isGiftUrlCreated) {
		return (<input type="text" name="example-gift-link" value={ url } className="o-forms__text"></input>);
	}

	return (<input type="text" name="example-gift-link" value={ url } className="o-forms__text"  disabled='disabled'></input>);

};
