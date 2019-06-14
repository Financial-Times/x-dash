import { h } from '@financial-times/x-engine';

import styles from './styles.scss';

const TimelineGroup = ({ title, teaserComponents = [] }) => {
	return (
		<div className={styles.group}>
			<div className={styles.title}>
				{title}
			</div>

			<div className={styles.teasers}>
				{teaserComponents.map(Teaser => <Teaser className={styles.teaser} />)}
			</div>
		</div>
	);
};

export default TimelineGroup;
