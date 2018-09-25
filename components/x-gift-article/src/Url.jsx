import { h } from '@financial-times/x-engine';
import { SHARE_TYPE_GIFT } from './lib/constants';
import styles from './GiftArticle.css';

const urlClassNames = [
	'o-forms__text',
	'js-gift-article__copy-target',
	styles.url
].join(' ');

export default ({ shareType, isGiftUrlCreated, url, urlType }) => {
	return (
		<input
			type="text"
			name={ urlType }
			value={ url }
			className={ urlClassNames }
			disabled={ shareType === SHARE_TYPE_GIFT && !isGiftUrlCreated }
			readOnly/>
	);
};
