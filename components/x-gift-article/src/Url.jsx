import { h } from '@financial-times/x-engine';
import styles from './GiftArticle.css';

const urlClassNames = [
	'o-forms__text',
	styles.url
].join(' ');

export default ({ isGift, isGiftUrlCreated, url, urlType }) => {

	if (!isGift || isGiftUrlCreated) {
		return (<input type="text" name={ urlType } value={ url } className={ urlClassNames }></input>);
	}

	return (<input type="text" name={ urlType } value={ url } className={ urlClassNames }  disabled='disabled'></input>);

};
