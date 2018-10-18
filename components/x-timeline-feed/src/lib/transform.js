import {
	getLocalisedISODate,
	getTitleForArticleDateGroup,
	splitLatestEarlier
} from './date';

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
		date: localDate,
		articles
	}));
};

export const splitTodaysArticles = (articleGroups, latestArticlesTime) => {
	const { latestArticles, earlierArticles } = splitLatestEarlier(articleGroups[0].articles, latestArticlesTime);

	if (latestArticles.length === 0) {
		return articleGroups;
	}

	articleGroups.shift();

	return [
		{
			date: 'today-latest',
			articles: latestArticles
		},
		{
			date: 'today-earlier',
			articles: earlierArticles
		},
		...articleGroups
	];
};

export const addArticleGroupTitles = (articleGroups, localTodayDate) => {
	return articleGroups.map(articleGroup => {
		articleGroup.title = getTitleForArticleDateGroup(articleGroup.date, localTodayDate);

		return articleGroup;
	});
};
