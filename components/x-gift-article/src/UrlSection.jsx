import { h } from '@financial-times/x-engine';
import Url from './Url';
import Message from './Message';
import Buttons from './Buttons';

export default ({ isGift, isGiftUrlCreated, url, credit, mailtoUrl, createGiftUrl }) => (
	<div className="gift-form__radio-section" data-section-id="giftLink" data-trackable="giftLink">
		<div className="gift-form__create-link">
			<Url
				isGift={ isGift }
				isGiftUrlCreated={ isGiftUrlCreated }
				url={ url }/>
			<Message
				isGift={ isGift }
				isGiftUrlCreated={ isGiftUrlCreated }
				credit={ credit }/>
			<Buttons
				isGift={ isGift }
				isGiftUrlCreated={ isGiftUrlCreated }
				mailtoUrl={ mailtoUrl }
				createGiftUrl={ createGiftUrl }/>
		</div>
	</div>
);
