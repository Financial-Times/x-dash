import { h } from '@financial-times/x-engine';
import { shareType } from './lib/constants';
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


export default ({
	shareType,
	isGiftUrlCreated,
	mailtoUrl,
	createGiftUrl,
	copyGiftUrl,
	copyNonGiftUrl,
	emailGiftUrl,
	emailNonGiftUrl,
	showCopyButton,
	showNativeShareButton,
	shareByNativeShare
}) => {

	if (isGiftUrlCreated || shareType === shareType.nonGift) {

		if (showNativeShareButton) {
			return (
				<div className={ ButtonsClassName }>
					<button className={ ButtonWithGapClassNames } type="button" onClick={ shareByNativeShare }>Share link</button>
				</div>
			);
		}

		return (
			<div className={ ButtonsClassName }>
				{ showCopyButton &&
					<button
						className={ ButtonWithGapClassNames }
						type="button"
						onClick={ shareType === shareType.gift ? copyGiftUrl : copyNonGiftUrl }
					>
						Copy link
					</button>
				}
				<a className={ ButtonClassNames } href={ mailtoUrl } target="_blank" rel="noopener noreferrer" onClick={ shareType === shareType.gift ? emailGiftUrl : emailNonGiftUrl }>Email link</a>
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
