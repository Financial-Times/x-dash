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

	articleGroups[0] = {
		date: 'today-earlier',
		articles: earlierArticles
	};

	if (latestArticles.length) {
		articleGroups.unshift({
			date: 'today-latest',
			articles: latestArticles
		});
	}

	return articleGroups;
};

export const addArticleGroupTitles = (articleGroups, localTodayDate) => {
	return articleGroups.map(articleGroup => {
		articleGroup.title = getTitleForArticleDateGroup(articleGroup.date, localTodayDate);

		return articleGroup;
	});
};
