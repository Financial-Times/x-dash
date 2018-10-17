import { getLocalisedISODate, getTitleForArticleDateGroup } from './date';

export const groupArticlesByLocalisedDate = (articles, timezoneOffset) => {
	const articlesByLocalisedDate = {};

	articles.forEach((article, index) => {
		const localDateTime = getLocalisedISODate(article.lastUpdated, timezoneOffset);
		const localDate = localDateTime.substring(0, 10);

		if (!articlesByLocalisedDate.hasOwnProperty(localDate)) {
			articlesByLocalisedDate[localDate] = [];
		}

		article.localisedLastUpdated = localDateTime;
		articlesByLocalisedDate[localDate].push({ articleIndex: index, ...article });
	});

	return Object.entries(articlesByLocalisedDate).map(([localDate, articles]) => ({
		title: getTitleForArticleDateGroup(localDate),
		date: localDate,
		articles
	}));
};
