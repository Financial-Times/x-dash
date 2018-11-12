import { h } from '@financial-times/x-engine';
import { Teaser, presets } from '@financial-times/x-teaser';
import { getArticleGroups } from './lib/transform';
import styles from './TimelineFeed.scss';
import classNames from 'classnames';

const TimelineFeed = props => {
	const { articleCustomSlot = () => {} } = props;
	const articleGroups = getArticleGroups(props);

	return articleGroups.length && (
		<div>
			{articleGroups.map(group => (
				<section key={group.date} className={classNames(styles.itemGroup)}>
					<h2 className={classNames(styles.itemGroup__heading)}>{group.title}</h2>
					<ul className={classNames(styles.itemGroup__items)}>
						{group.articles.map(article => {
							const slotContent = typeof articleCustomSlot === 'function' ? articleCustomSlot(article): articleCustomSlot;

							return (
								<li key={article.id} className={styles.item}>
									<Teaser
										{...article}
										{...presets.SmallHeavy}
									/>
									{typeof slotContent === 'string' ? <div
										className={classNames(styles.itemActions)}
										dangerouslySetInnerHTML={{__html: slotContent }}
									/> : slotContent}
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
