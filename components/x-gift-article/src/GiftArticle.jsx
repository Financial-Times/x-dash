import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';
import Loading from './Loading';
import Form from './Form';

import getGiftUrl from './lib/get-gift-url';
import fetchGiftCredit from './lib/fetch-gift-credit';

let hasAttempetedToFetchCredit = false;
let propsComposer;

const withGiftFormActions = withActions({
	displayGiftUrlSection() {
		return propsComposer.displayGiftUrlSection();
	},

	displayNonGiftUrlSection() {
		return propsComposer.displayNonGiftUrlSection();
	},

	createGiftUrl() {
		return getGiftUrl()
			.then(url => {
				return propsComposer.setGiftUrl(url);
			})
	},

	fetchCredit() {
		return fetchGiftCredit()
			.then(credit => {
				return { credit };
			})
			.catch(() => {
				// do something
			})
	}
});

const BaseTemplate = (props) => {
	if (!propsComposer) {
		propsComposer = props.composer;
	}

	if (!hasAttempetedToFetchCredit && !props.isFreeArticle) {
		hasAttempetedToFetchCredit = true;
		props.actions.fetchCredit();
	}

	return props.isLoading ? <Loading/> : <Form {...props}/>;
};

const GiftArticle = withGiftFormActions(BaseTemplate);

export { GiftArticle };
