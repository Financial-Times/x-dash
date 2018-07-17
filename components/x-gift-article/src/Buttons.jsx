import { h } from '@financial-times/x-engine';
import styles from './GiftArticle.css';

const ButtonsClassName = styles.buttons;

const ButtonClassNames = [
	'o-buttons',
	'o-buttons--primary',
	'o-buttons--big'
].join(' ');

const ButtonWithGapClassNames = [
	ButtonClassNames,
	'js-copy-link',
	styles['button--with-gap']
].join(' ');


export default ({ isGift, isGiftUrlCreated, mailtoUrl, createGiftUrl }) => {

	if (isGiftUrlCreated || !isGift) {
		return (
			<div className={ ButtonsClassName }>
				<button className={ ButtonWithGapClassNames } type="button">Copy link</button>
				<a className={ ButtonClassNames } href={ mailtoUrl } target="_blank">Email link</a>
			</div>
		);
	}

	return (
		<div className={ ButtonsClassName }>
			<button className={ ButtonClassNames } type="button" onClick={ createGiftUrl }>
				Create gift link
			</button>
		</div>
	);

};
