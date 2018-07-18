import { h } from '@financial-times/x-engine';
import styles from './GiftArticle.css';

const urlClassNames = [
	'o-forms__text',
	styles.url
].join(' ');

export default ({ isLoading, isGift, isGiftUrlCreated, url, urlType }) => {
	return (<input type="text" name={ urlType } value={ isLoading ? 'Creating a gift url...' : url } className={ urlClassNames } disabled={ isGift && !isGiftUrlCreated }></input>);
};
