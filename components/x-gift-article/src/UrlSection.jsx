import { h } from '@financial-times/x-engine';
import Url from './Url';
import Message from './Message';
import Buttons from './Buttons';
import styles from './GiftArticle.css';

export default ({ type, isGift, isGiftUrlCreated, isFreeArticle, url, urlType, giftCredits, monthlyAllowance, dateText, mailtoUrl, createGiftUrl, copyGiftUrl, copyNonGiftUrl, redemptionLimit, showCopyButton }) => (
	<div className={ styles['url-section'] } data-section-id={ type } data-trackable={ type }>

		{ giftCredits === 0 && isGift ? null : <Url
				isGift={ isGift }
				isGiftUrlCreated={ isGiftUrlCreated }
				url={ url }
				urlType={ urlType }/>
		}

		<Message
			isGift={ isGift }
			isGiftUrlCreated={ isGiftUrlCreated }
			isFreeArticle={ isFreeArticle }
			giftCredits={ giftCredits }
			monthlyAllowance={ monthlyAllowance }
			dateText={ dateText }
			redemptionLimit={ redemptionLimit }
			/>

		{ giftCredits === 0  && isGift ? null : <Buttons
				isGift={ isGift }
				isGiftUrlCreated={ isGiftUrlCreated }
				mailtoUrl={ mailtoUrl }
				createGiftUrl={ createGiftUrl }
				copyGiftUrl={ copyGiftUrl }
				copyNonGiftUrl={ copyNonGiftUrl }
				showCopyButton={ showCopyButton }/>
		}

	</div>
);
