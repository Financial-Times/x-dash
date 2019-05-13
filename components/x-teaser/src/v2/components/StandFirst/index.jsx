import { h } from '@financial-times/x-engine';
import c from 'classnames';

import styles from './styles.scss';
import { withThemes } from '../../themes/withThemes';

const StandFirst = ({ text, className }) => (
	<div className={c(styles.standfirst, className)}>{text}</div>
);

export default withThemes(StandFirst, styles);
