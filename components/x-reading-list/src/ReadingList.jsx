import { h } from '@financial-times/x-engine';
import { ArticleSaveButton } from '@financial-times/x-article-save-button';
import { Teaser, presets } from '@financial-times/x-teaser';
import styles from './ReadingList.scss';
import classNames from 'classnames';

const ReadingList = props => {
	const {
		csrfToken = null,
		items
	} = props;

	// const itemGroups = buildModel({items, timezoneOffset, localTodayDate, latestItemsTime, latestItemsAgeHours});

	return items.length > 0 && (
		<section>
			<h2 className={classNames(styles.itemGroup__heading)}>Reading List Name</h2>
			<h3 className={classNames(styles.itemGroup__subheading)}>By User Name</h3>
			<ul>
				{items.map(item => {
					if (item.id) {
						return (
							<li key={item.id} className={styles.item}>
								<Teaser
									{...item}
									{...presets.Small}
									modifiers="readinglist-teaser"
								/>
								<div className={classNames(styles.itemActions)}>
									<ArticleSaveButton
										id={`${item.id}-save-button`}
										contentId={item.id}
										contentTitle={item.title}
										csrfToken={csrfToken}
										saved={item.saved || false}
									/>
								</div>
							</li>
						);
					}
				})}
			</ul>
		</section>
	);
};

export { ReadingList };
