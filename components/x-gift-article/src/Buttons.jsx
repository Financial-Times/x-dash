import { h } from '@financial-times/x-engine';

export default ({ isGift, isGiftUrlCreated, mailtoUrl, createGiftUrl }) => {

	if (isGiftUrlCreated || !isGift) {
		return (
			<div className="gift-form__buttons">
				<button className="o-buttons o-buttons--primary o-buttons--big js-copy-link" type="button">Copy link</button>
				<a className="o-buttons o-buttons--primary o-buttons--big" href={ mailtoUrl } target="_blank">Email link</a>
			</div>
		);
	}

	return (
		<div className="gift-form__buttons">
			<button className="o-buttons o-buttons--primary o-buttons--big" type="button" onClick={ createGiftUrl }>
				Create gift link
			</button>
		</div>
	);

};
