import { h } from '@financial-times/x-engine';
import c from 'classnames';

import styles from './styles.scss';

import { withThemes } from '../../themes/withThemes';

const PremiumLabel = () => (
	<div className={c('o-labels', 'o-labels--content-premium', styles.premiumLabel)} aria-label="Premium content">Premium</div>
);

const Title = ({ text, className, url, size = '2', isPremium = false, isCentered }) => (
	<div className={c(
		styles.title,
		styles[`size-${size}`],
		isCentered && styles.isCentered,
		className,
	)}>
		<a
			href={url}
			data-trackable="heading-link"
			className={styles.titleLink}
		>
			{text}
		</a>

		{isPremium && <PremiumLabel />}
	</div>
);

export default withThemes(Title, styles);
