import { h } from '@financial-times/x-engine';
import { ftTime } from '@financial-times/ft-date-format';
import TimelineGroup from '../TimelineGroup';

import styles from './styles.scss';

const isSameDay = (date1, date2) =>
	date1.getDate() == date2.getDate() &&
	date1.getMonth() == date2.getMonth() &&
	date1.getFullYear() == date2.getFullYear();

const isToday = someDate => isSameDay(new Date(), someDate);

const TeaserTimeline = ({ teasers = [] }) => {
	const teaserGroups = teasers
		.sort((teaser1, teaser2) => {
			return teaser2.publishTimestamp > teaser1.publishTimestamp;
		})
		.reduce((dayGroups, { publishTimestamp, Teaser }) => {
			const publishDate = new Date(publishTimestamp);
			const groupId = `${publishDate.getFullYear()}${publishDate.getMonth()}${publishDate.getDate()}`;
			const existingIndex = dayGroups.findIndex(group => group.id === groupId);

			if (existingIndex === -1) {
				dayGroups.push({
					id: groupId,
					title: isToday(publishDate) ? 'Earlier Today' : ftTime(publishDate),
					teaserComponents: [Teaser],
				});
			} else {
				dayGroups[existingIndex].teaserComponents.push(Teaser);
			}

			return dayGroups;
		}, []);

	return (
		<div className={styles.container}>
			{teaserGroups.map(group => <TimelineGroup key={group.title} {...group} />)}
		</div>
	);
};

export default TeaserTimeline;
