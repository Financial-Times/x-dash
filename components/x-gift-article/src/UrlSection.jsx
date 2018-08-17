import { h } from '@financial-times/x-engine';
import { SHARE_TYPE_GIFT } from './lib/constants';
import Url from './Url';
import Message from './Message';
import Buttons from './Buttons';
import styles from './GiftArticle.css';

export default ({ shareType, isGiftUrlCreated, isFreeArticle,
	url, urlType, giftCredits, monthlyAllowance, nextRenewalDateText,
	mailtoUrl, createGiftUrl, copyGiftUrl, copyNonGiftUrl,
	emailGiftUrl, emailNonGiftUrl, redemptionLimit, showCopyButton,
	showNativeShareButton, shareByNativeShare }) => {

	const hideUrlShareElements = ( giftCredits === 0 && shareType === SHARE_TYPE_GIFT );
	const showUrlShareElements = !hideUrlShareElements;

	return (
		<div
			className={ styles['url-section'] }
			data-section-id={ shareType + 'Link' }
			data-trackable={ shareType + 'Link' }>

			{ showUrlShareElements && <Url
					shareType={ shareType }
					isGiftUrlCreated={ isGiftUrlCreated }
					url={ url }
					urlType={ urlType }/>
			}

			<Message
				shareType={ shareType }
				isGiftUrlCreated={ isGiftUrlCreated }
				isFreeArticle={ isFreeArticle }
				giftCredits={ giftCredits }
				monthlyAllowance={ monthlyAllowance }
				nextRenewalDateText={ nextRenewalDateText }
				redemptionLimit={ redemptionLimit }
				/>

			{ showUrlShareElements && <Buttons
					shareType={ shareType }
					isGiftUrlCreated={ isGiftUrlCreated }
					mailtoUrl={ mailtoUrl }
					createGiftUrl={ createGiftUrl }
					copyGiftUrl={ copyGiftUrl }
					copyNonGiftUrl={ copyNonGiftUrl }
					emailGiftUrl={ emailGiftUrl }
					emailNonGiftUrl={ emailNonGiftUrl }
					showCopyButton={ showCopyButton }
					showNativeShareButton={ showNativeShareButton }
					shareByNativeShare={ shareByNativeShare }/>
			}

		</div>
	);
};
