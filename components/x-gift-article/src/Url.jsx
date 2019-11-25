import { h } from '@financial-times/x-engine';
import { ShareType } from './lib/constants';
import styles from './GiftArticle.scss';

const urlClassNames = [
	'o-forms__text',
	styles.url
].join(' ');

export default ({ shareType, isGiftUrlCreated, url, urlType }) => {
	return (
		<input
			type="text"
			name={ urlType }
			value={ url }
			className={ urlClassNames }
			disabled={ shareType === ShareType.gift && !isGiftUrlCreated }
			readOnly
		/>
	);
};
