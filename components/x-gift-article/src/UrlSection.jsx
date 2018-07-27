import { h } from '@financial-times/x-engine';
import Url from './Url';
import Message from './Message';
import Buttons from './Buttons';
import styles from './GiftArticle.css';

export default ({ type, isGift, isGiftUrlCreated, isFreeArticle, url, urlType, credit, monthlyAllowance, dateText, mailtoLink, createGiftUrl, redemptionLimit }) => (
	<div className={ styles['url-section'] } data-section-id={ type } data-trackable={ type }>

		{ credit === 0 && isGift ? null : <Url
				isGift={ isGift }
				isGiftUrlCreated={ isGiftUrlCreated }
				url={ url }
				urlType={ urlType }/>
		}

		<Message
			isGift={ isGift }
			isGiftUrlCreated={ isGiftUrlCreated }
			isFreeArticle={ isFreeArticle }
			credit={ credit }
			monthlyAllowance={ monthlyAllowance }
			dateText={ dateText }
			redemptionLimit={ redemptionLimit }
			/>

		{ credit === 0  && isGift ? null : <Buttons
				isGift={ isGift }
				isGiftUrlCreated={ isGiftUrlCreated }
				mailtoLink={ mailtoLink }
				createGiftUrl={ createGiftUrl }/>
		}

	</div>
);
