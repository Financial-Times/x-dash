import { h } from '@financial-times/x-engine'
import { ArticleSaveButton } from '@financial-times/x-article-save-button'
import { Teaser, presets } from '@financial-times/x-teaser'
import { buildModel } from './lib/transform'
import { getDateOnly } from './lib/date'
import styles from './TeaserTimeline.scss'
import classNames from 'classnames'

/**
 * @typedef {Object} Props
 * @property {string} csrfToken
 * @property {boolean} showSaveButtons
 * @property {Array<Object> | Array<string> | Object | string} customSlotContent
 * @property {Array<number> | number} customSlotPosition
 * @property {Array<Item>} items
 * @property {number} timezoneOffset
 * @property {string} localTodayDate
 * @property {string} latestItemsTime,
 * @property {number} latestItemsAgeHours
 *
 * @param {Props} props
 * @returns
 */
const TeaserTimeline = (props) => {
	const now = new Date()
	const {
		csrfToken = null,
		showSaveButtons = true,
		customSlotContent,
		customSlotPosition = 2,
		items,
		timezoneOffset = now.getTimezoneOffset(),
		localTodayDate = getDateOnly(now.toISOString()),
		latestItemsTime,
		latestItemsAgeHours
	} = props

	const itemGroups = buildModel({
		items,
		customSlotContent,
		customSlotPosition,
		timezoneOffset,
		localTodayDate,
		latestItemsTime,
		latestItemsAgeHours
	})

	return (
		itemGroups.length > 0 && (
			<div>
				{itemGroups.map((group) => (
					<section key={group.date} className={classNames(styles.itemGroup)}>
						<h2 className={classNames(styles.itemGroup__heading)}>{group.title}</h2>
						<ul className={classNames(styles.itemGroup__items)}>
							{group.items.map((item, index) => {
								if (item.id) {
									return (
										<li key={item.id} className={styles.item}>
											<Teaser {...item} {...presets.SmallHeavy} modifiers="timeline-teaser" />
											{showSaveButtons && (
												<div className={classNames(styles.itemActions)}>
													<ArticleSaveButton
														id={`${item.id}-save-button`}
														contentId={item.id}
														contentTitle={item.title}
														csrfToken={csrfToken}
														saved={item.saved || false}
													/>
												</div>
											)}
										</li>
									)
								} else if (typeof item === 'string') {
									return <li key={`custom-slot-${index}`} dangerouslySetInnerHTML={{ __html: item }} />
								}

								return <li key={`custom-slot-${index}`}>{item}</li>
							})}
						</ul>
					</section>
				))}
			</div>
		)
	)
}

export { TeaserTimeline }
