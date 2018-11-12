import {
	getLocalisedISODate,
	getTitleForArticleDateGroup,
	splitLatestEarlier
} from './date';

export const getDateOnly = date => date.substr(0, 10);

export const groupArticlesByLocalisedDate = (articles, timezoneOffset) => {
	const articlesByLocalisedDate = {};

	articles.forEach((article, index) => {
		const localDateTime = getLocalisedISODate(article.publishedDate, timezoneOffset);
		const localDate = getDateOnly(localDateTime);

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

export const splitTodaysArticles = (articleGroups, localTodayDate, latestArticlesTime) => {
	const firstGroupIsToday = articleGroups[0] && articleGroups[0].date === localTodayDate;
	const latestTimeIsToday = getDateOnly(latestArticlesTime) === localTodayDate;

	if (!firstGroupIsToday || !latestTimeIsToday) {
		return articleGroups;
	}

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

export const getArticleGroups = props => {
	const now = new Date();
	const {
		articles,
		timezoneOffset = now.getTimezoneOffset(),
		localTodayDate = getDateOnly(now.toISOString()),
		latestArticlesTime
	} = props;

	if (!articles || !Array.isArray(articles) || articles.length === 0) {
		return [];
	}

	let articleGroups = groupArticlesByLocalisedDate(articles, timezoneOffset);

	if (latestArticlesTime) {
		articleGroups = splitTodaysArticles(articleGroups, localTodayDate, latestArticlesTime);
	}

	return addArticleGroupTitles(articleGroups, localTodayDate);
};
