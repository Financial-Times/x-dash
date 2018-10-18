import {
	getLocalisedISODate,
	getTitleForArticleDateGroup,
	splitLatestEarlier
} from './date';

export const groupArticlesByLocalisedDate = (articles, timezoneOffset, localTodayDate) => {
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
		title: getTitleForArticleDateGroup(localDate, localTodayDate),
		date: localDate,
		articles
	}));
};

export const splitTodaysArticles = (articleGroups, localTodayDate, latestArticlesTime) => {
	if (articleGroups[0].date !== localTodayDate) {
		return articleGroups;
	}

	const { latestArticles, earlierArticles } = splitLatestEarlier(articleGroups[0].articles, latestArticlesTime);

	if (latestArticles.length === 0) {
		return articleGroups;
	}

	articleGroups.shift();

	const todayGroups = [
		{
			title: getTitleForArticleDateGroup('today-latest', localTodayDate),
			date: 'today-latest',
			articles: latestArticles
		},
		{
			title: getTitleForArticleDateGroup('today-earlier', localTodayDate),
			date: 'today-earlier',
			articles: earlierArticles
		}
	];

	return todayGroups.concat(articleGroups);
};
