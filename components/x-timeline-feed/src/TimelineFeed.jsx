import { h } from '@financial-times/x-engine';
import {
	groupArticlesByLocalisedDate,
	splitTodaysArticles
} from './lib/transform';
import styles from './TimelineFeed.css';
import classNames from 'classnames';

const TimelineFeed = ({ articles, timezoneOffset = 0, localTodayDate, latestArticlesTime }) => {
	let articleGroups = groupArticlesByLocalisedDate(articles, timezoneOffset, localTodayDate);

	if (latestArticlesTime) {
		articleGroups = splitTodaysArticles(articleGroups, localTodayDate, latestArticlesTime);
	}

	return (
		<div className={classNames(styles.root)}>
			{articleGroups.map(group => (
				<section key={group.date} className={classNames(styles.articleGroup)}>
					<h2 className={classNames(styles.articleGroup__heading)}>{group.title}</h2>
					<ul className={classNames(styles.articleGroup__articles)}>
						{group.articles.map(article => (
							<li key={article.id}>{article.title}</li>
						))}
					</ul>
				</section>
			))}
		</div>
	);
};

export { TimelineFeed };
