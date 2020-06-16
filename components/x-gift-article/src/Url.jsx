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

const urlLabelClassNames = [
	styles['hidden-label-text']
].join('');

export default ({ shareType, isGiftUrlCreated, url, urlType }) => {
	return (
		<span className={ urlWrapperClassNames }>
			<label htmlFor={urlType} className={urlLabelClassNames}></label>
			<input
				type="text"
				name={ urlType }
				value={ url }
				className={ urlClassNames }
				disabled={ shareType === ShareType.gift && !isGiftUrlCreated }
				readOnly
			/>
		</span>
	);
};
