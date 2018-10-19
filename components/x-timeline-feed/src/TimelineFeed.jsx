import { h } from '@financial-times/x-engine';
import { Teaser, presets } from '@financial-times/x-teaser';
import {
	addArticleGroupTitles,
	groupArticlesByLocalisedDate,
	splitTodaysArticles
} from './lib/transform';
import styles from './TimelineFeed.css';
import classNames from 'classnames';

const TimelineFeed = ({ articles, timezoneOffset = 0, localTodayDate, latestArticlesTime }) => {
	let articleGroups = groupArticlesByLocalisedDate(articles, timezoneOffset);

	if (latestArticlesTime && articleGroups[0].date === localTodayDate) {
		articleGroups = splitTodaysArticles(articleGroups, latestArticlesTime);
	}

	articleGroups = addArticleGroupTitles(articleGroups, localTodayDate);

	return (
		<div className={classNames(styles.root)}>
			{articleGroups.map(group => (
				<section key={group.date} className={classNames(styles.articleGroup)}>
					<h2 className={classNames(styles.articleGroup__heading)}>{group.title}</h2>
					<ul className={classNames(styles.articleGroup__articles)}>
						{group.articles.map(article => (
							<li key={article.id}>
								<Teaser
									{...article}
									{...presets.SmallHeavy}
								/>
							</li>
						))}
					</ul>
				</section>
			))}
		</div>
	);
};

export { TimelineFeed };
