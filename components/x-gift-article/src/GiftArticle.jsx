import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';
import Loading from './Loading';
import Form from './Form';

import api from './lib/api';

let hasAttempetedToGetAllowance = false;
let propsComposer;

const withGiftFormActions = withActions(({ articleId, sessionId }) => ({
	displayGiftUrlSection() {
		return propsComposer.displayGiftUrlSection();
	},

	displayNonGiftUrlSection() {
		return propsComposer.displayNonGiftUrlSection();
	},

	createGiftUrl() {
		return api.createGiftUrl(articleId, sessionId)
			.then(({ redemptionUrl, redemptionLimit }) => {
				return propsComposer.setGiftUrl(redemptionUrl, redemptionLimit);
			})
	},

	getAllowance() {
		return api.getGiftArticleAllowance()
			.then(({ credit, monthlyAllowance }) => {
				return propsComposer.setAllowance(credit, monthlyAllowance);
			})
			.catch(() => {
				// do something
			})
	}
}));

const BaseTemplate = (props) => {
	if (!propsComposer) {
		propsComposer = props.composer;
	}

	if (!hasAttempetedToGetAllowance && !props.isFreeArticle) {
		hasAttempetedToGetAllowance = true;
		props.actions.getAllowance();
	}

	return props.isLoading ? <Loading/> : <Form {...props}/>;
};

const GiftArticle = withGiftFormActions(BaseTemplate);

export { GiftArticle };
