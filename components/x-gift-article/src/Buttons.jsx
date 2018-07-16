import { h } from '@financial-times/x-engine';

export default ({ isGift, isGiftUrlCreated, mailtoUrl, createGiftUrl }) => {

	if (isGiftUrlCreated || !isGift) {
		return (
			<div className="o-forms__suffix">
				<div className="gift-form__buttons-align">
					<button className="o-buttons o-buttons--primary o-buttons--big gift-form__button--with-gap js-copy-link" type="button">Copy link</button>
					<a className="o-buttons o-buttons--primary o-buttons--big" href={ mailtoUrl } target="_blank">Email link</a>
				</div>
			</div>
		);
	}

	return (
		<div className="o-forms__suffix">
			<button className="o-buttons o-buttons--primary o-buttons--big" type="button" onClick={ createGiftUrl }>
				Create gift link
			</button>
		</div>
	);

};
