import { h } from '@financial-times/x-engine';
import { ShareType } from './lib/constants';
import Url from './Url';
import Message from './Message';
import Buttons from './Buttons';
import styles from './GiftArticle.css';

const urlSectionClassNames = [
	'js-gift-article__url-section',
	styles['url-section']
].join(' ');

export default ({
	shareType,
	isGiftUrlCreated,
	isFreeArticle,
	url,
	urlType,
	giftCredits,
	monthlyAllowance,
	nextRenewalDateText,
	mailtoUrl,
	redemptionLimit,
	showCopyButton,
	showNativeShareButton,
	actions
}) => {

	const hideUrlShareElements = ( giftCredits === 0 && shareType === ShareType.gift );
	const showUrlShareElements = !hideUrlShareElements;

	return (
		<div
			className={ urlSectionClassNames }
			data-section-id={ shareType + 'Link' }
			data-trackable={ shareType + 'Link' }>

			{ showUrlShareElements && <Url {...{
				shareType,
				isGiftUrlCreated,
				url,
				urlType,
			}} /> }

			<Message {...{
				shareType,
				isGiftUrlCreated,
				isFreeArticle,
				giftCredits,
				monthlyAllowance,
				nextRenewalDateText,
				redemptionLimit,
			}} />

			{ showUrlShareElements && <Buttons {...{
				shareType,
				isGiftUrlCreated,
				mailtoUrl,
				showCopyButton,
				showNativeShareButton,
				actions,
			}} /> }

		</div>
	);
};
