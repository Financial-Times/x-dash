import { h } from '@financial-times/x-engine';
import { Teaser, presets } from '@financial-times/x-teaser';
import { getArticleGroups } from './lib/transform';
import styles from './TimelineFeed.scss';
import classNames from 'classnames';

const TimelineFeed = props => {
	const { articleActionsCreator = () => {} } = props;
	const articleGroups = getArticleGroups(props);

	return articleGroups.length && (
		<div className={classNames(styles.root)}>
			{articleGroups.map(group => (
				<section key={group.date} className={classNames(styles.articleGroup)}>
					<h2 className={classNames(styles.articleGroup__heading)}>{group.title}</h2>
					<ul className={classNames(styles.articleGroup__articles)}>
						{group.articles.map(article => {
							const articleActions = articleActionsCreator(article);

							return (
								<li key={article.id} className={styles.article}>
									<Teaser
										{...article}
										{...presets.SmallHeavy}
									/>
									{articleActions && <div
										className={classNames(styles.articleActions)}
										dangerouslySetInnerHTML={{__html: articleActions }}
									/>}
								</li>
							);
						})}
					</ul>
				</section>
			))}
		</div>
	);
};

export { TimelineFeed };
