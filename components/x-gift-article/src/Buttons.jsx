import { h } from '@financial-times/x-engine';

export default ({ isGift, isGiftUrlCreated, mailtoUrl, createGiftUrl }) => {

	if (isGiftUrlCreated || !isGift) {
		return (
			<div className="gift-form__buttons">
				<button className="gift-form__button js-copy-link" type="button">Copy link</button>
				<a className="gift-form__button js-email-link" href={ mailtoUrl } target="_blank">Email link</a>
			</div>
		);
	}

	return (
		<div className="gift-form__buttons">
			<button className="gift-form__button js-create-gift-link" type="button" onClick={ createGiftUrl }>
				Create gift link
			</button>
		</div>
	);

};
