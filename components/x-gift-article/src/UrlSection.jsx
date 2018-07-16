import { h } from '@financial-times/x-engine';
import Url from './Url';
import Buttons from './Buttons';

export default ({ isGift, isGiftUrlCreated, url, mailtoUrl, createGiftUrl }) => (
	<div className="gift-form__radio-section" data-section-id="giftLink" data-trackable="giftLink">
		<div className="gift-form__create-link o-forms__affix-wrapper">
			<Url
				isGift={ isGift }
				isGiftUrlCreated={ isGiftUrlCreated }
				url={ url }/>
			<Buttons
				isGift={ isGift }
				isGiftUrlCreated={ isGiftUrlCreated }
				mailtoUrl={ mailtoUrl }
				createGiftUrl={ createGiftUrl }/>
		</div>
	</div>
);
