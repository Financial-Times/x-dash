import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';
import Loading from './Loading';
import Form from './Form';

import api from './lib/api';
import getNextAllowanceDate from './lib/get-next-allowance-date'

let hasAttempetedToGetAllowance = false;
let propsComposer;

const withGiftFormActions = withActions({
	displayGiftUrlSection() {
		return propsComposer.displayGiftUrlSection();
	},

	displayNonGiftUrlSection() {
		return propsComposer.displayNonGiftUrlSection();
	},

	createGiftUrl() {
		return api.createGiftUrl()
			.then(url => {
				return propsComposer.setGiftUrl(url);
			})
	},

	getAllowance() {
		return api.getGiftArticleAllowance()
			.then(({ credit, monthlyAllowance }) => {
				let dateText = undefined;
				if (credit === 0) {
					const nextAllowanceDate = getNextAllowanceDate();
					dateText = `${nextAllowanceDate.monthName} ${nextAllowanceDate.day}`;
				}

				return { monthlyAllowance, credit, dateText };
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

	if (!hasAttempetedToGetAllowance && !props.isFreeArticle) {
		hasAttempetedToGetAllowance = true;
		props.actions.getAllowance();
	}

	return props.isLoading ? <Loading/> : <Form {...props}/>;
};

const GiftArticle = withGiftFormActions(BaseTemplate);

export { GiftArticle };
