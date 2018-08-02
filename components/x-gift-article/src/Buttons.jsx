import { h } from '@financial-times/x-engine';
import { SHARE_TYPE_GIFT, SHARE_TYPE_NON_GIFT } from './lib/constants';
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


export default ({ shareType, isGiftUrlCreated, mailtoUrl, createGiftUrl, copyGiftUrl, copyNonGiftUrl, showCopyButton }) => {

	if (isGiftUrlCreated || shareType === SHARE_TYPE_NON_GIFT) {
		return (
			<div className={ ButtonsClassName }>
				{ showCopyButton ? <button className={ ButtonWithGapClassNames } type="button" onClick={ shareType === SHARE_TYPE_GIFT ? copyGiftUrl : copyNonGiftUrl }>Copy link</button> : null }
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
