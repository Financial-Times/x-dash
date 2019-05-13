import { h } from '@financial-times/x-engine';
import ftDateFormat from '@financial-times/ft-date-format';
import c from 'classnames';

import styles from './styles.scss';
import { withThemes } from '../../themes/withThemes';

const oneMonthMs = 2628000000;

export const Timestamp = ({ publishedDate, className }) => {
	const displayCutOffDate = Date.now() - oneMonthMs;
	const teaserDate = new Date(publishedDate);
	const isDisplayed = teaserDate > displayCutOffDate;

	return isDisplayed ? (
		<time
			dateTime={teaserDate.toISOString()}
			className={c(className, styles.time)}
		>
			{ftDateFormat.ftTime(new Date(publishedDate))}
		</time>
	) : null;
}


export default withThemes(Timestamp, styles);
