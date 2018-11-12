import { h } from '@financial-times/x-engine';
import { Teaser, presets } from '@financial-times/x-teaser';
import { getItemGroups } from './lib/transform';
import styles from './TimelineFeed.scss';
import classNames from 'classnames';

const TimelineFeed = props => {
	const { itemCustomSlot = () => {} } = props;
	const itemGroups = getItemGroups(props);

	return itemGroups.length && (
		<div>
			{itemGroups.map(group => (
				<section key={group.date} className={classNames(styles.itemGroup)}>
					<h2 className={classNames(styles.itemGroup__heading)}>{group.title}</h2>
					<ul className={classNames(styles.itemGroup__items)}>
						{group.items.map(item => {
							const slotContent = typeof itemCustomSlot === 'function' ? itemCustomSlot(item): itemCustomSlot;

							return (
								<li key={item.id} className={styles.item}>
									<Teaser
										{...item}
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
