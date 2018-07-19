import { h } from '@financial-times/x-engine';
import Title from './Title';
import RadioButtonsSection from './RadioButtonsSection';
import UrlSection from './UrlSection';

import styles from './GiftArticle.css';
const containerClassNames = [
	'o-forms',
	styles.container
].join(' ');

export default (data) => (
	<form name="gift-form">
		<fieldset className={ containerClassNames }>
			<Title title={ data.title }/>
			<RadioButtonsSection
				displayGiftUrlSection={ data.actions.displayGiftUrlSection }
				displayNonGiftUrlSection={ data.actions.displayNonGiftUrlSection }/>
			<UrlSection
				tracking={ data.tracking }
				isGift={ data.isGift }
				isGiftUrlCreated={ data.isGiftUrlCreated }
				url={ data.url }
				urlType={ data.urlType }
				credit={ data.credit }
				mailtoUrl={ data.mailtoUrl }
				createGiftUrl={ data.actions.createGiftUrl }/>
		</fieldset>
	</form>
);
