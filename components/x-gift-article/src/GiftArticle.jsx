import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';
import Loading from './Loading';
import Form from './Form';

import getGiftUrl from './lib/get-gift-url';
import fetchGiftCredit from './lib/fetch-gift-credit';
import { GiftArticlePropsComposer } from './lib/props-composer';

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
				return propsComposer.createGiftUrl(url);
			})
	},

	composeData() {
		const composedProps = propsComposer.getDefault();

		return fetchGiftCredit()
			.then(credit => {
				composedProps.credit = credit
				return composedProps;
			})
			.catch(() => {
				return composedProps;
			})
	}
});

const BaseTemplate = (props) => {
	if (!hasAttempetedToFetchCredit) {
		hasAttempetedToFetchCredit = true;
		propsComposer = new GiftArticlePropsComposer(props);
		props.actions.composeData();
	}

	return props.isLoading ? <Loading/> : <Form {...props}/>;
};

const GiftArticle = withGiftFormActions(BaseTemplate);

export { GiftArticle };
