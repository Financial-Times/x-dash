import { h } from '@financial-times/x-engine';
import Url from './Url';
import Message from './Message';
import Buttons from './Buttons';
import styles from './GiftArticle.css';

export default ({ type, isGift, isGiftUrlCreated, isFreeArticle, url, urlType, credit, mailtoUrl, createGiftUrl }) => (
	<div className={ styles['url-section'] } data-section-id={ type } data-trackable={ type }>
		<Url
			isGift={ isGift }
			isGiftUrlCreated={ isGiftUrlCreated }
			url={ url }
			urlType={ urlType }/>
		<Message
			isGift={ isGift }
			isGiftUrlCreated={ isGiftUrlCreated }
			isFreeArticle={ isFreeArticle }
			credit={ credit }/>
		<Buttons
			isGift={ isGift }
			isGiftUrlCreated={ isGiftUrlCreated }
			mailtoUrl={ mailtoUrl }
			createGiftUrl={ createGiftUrl }/>
	</div>
);
