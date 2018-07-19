import { h } from '@financial-times/x-engine';
import Title from './Title';
import RadioButtonsSection from './RadioButtonsSection';
import UrlSection from './UrlSection';

import styles from './GiftArticle.css';
const containerClassNames = [
	'o-forms',
	styles.container
].join(' ');

export default (props) => (
	<form name="gift-form">
		<fieldset className={ containerClassNames }>
			<Title title={ props.title }/>
			<RadioButtonsSection
				isGift={ props.isGift }
				displayGiftUrlSection={ props.actions.displayGiftUrlSection }
				displayNonGiftUrlSection={ props.actions.displayNonGiftUrlSection }/>
			<UrlSection
				tracking={ props.tracking }
				isGift={ props.isGift }
				isGiftUrlCreated={ props.isGiftUrlCreated }
				url={ props.url }
				urlType={ props.urlType }
				credit={ props.credit }
				mailtoUrl={ props.mailtoUrl }
				createGiftUrl={ props.actions.createGiftUrl }/>
		</fieldset>
	</form>
);
