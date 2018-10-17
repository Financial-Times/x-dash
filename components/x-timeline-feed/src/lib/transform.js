import {
	getLocalisedISODate,
	getLocalisedTodayDate,
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
		title: getTitleForArticleDateGroup(localDate),
		date: localDate,
		articles
	}));
};

export const splitTodaysArticles = (articleGroups, timezoneOffset, latestArticlesTime) => {
	const localToday = getLocalisedTodayDate(timezoneOffset);

	if (articleGroups[0].date !== localToday) {
		return articleGroups;
	}

	const { latestArticles, earlierArticles } = splitLatestEarlier(articleGroups[0].articles, latestArticlesTime);

	if (latestArticles.length === 0) {
		return articleGroups;
	}

	articleGroups.shift();

	const todayGroups = [
		{
			title: 'Latest News',
			date: 'latest',
			articles: latestArticles
		},
		{
			title: 'Earlier Today',
			date: 'earlier',
			articles: earlierArticles
		}
	];

	return todayGroups.concat(articleGroups);
};
