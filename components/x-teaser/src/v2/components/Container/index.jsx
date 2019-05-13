import { h } from '@financial-times/x-engine';
import c from 'classnames';

import styles from './styles.scss';
import { withThemes } from '../../themes/withThemes';

const Container = ({ children, className, hasHalfBackground = false }) => (
	<div className={c(
		styles.container,
		hasHalfBackground && styles.hasHalfBackground,
		className,
	)}>
		{children}
	</div>
);

export default withThemes(Container, styles);
