import { h } from '@financial-times/x-engine';
import { ShareType } from './lib/constants';
import styles from './GiftArticle.scss';


const urlWrapperClassNames = [
	styles['o-forms-input'],
	styles['o-forms-input--text']
].join(' ');

const urlClassNames = [
	styles['url-input']
].join(' ');

export default ({ shareType, isGiftUrlCreated, url, urlType }) => {
	return (
		<span className={ urlWrapperClassNames }>
			<input
				type="text"
				name={ urlType }
				value={ url }
				className={ urlClassNames }
				disabled={ shareType === ShareType.gift && !isGiftUrlCreated }
				readOnly
				aria-label="gift-article-link"
			/>
		</span>
	);
};
