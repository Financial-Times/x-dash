import { h } from '@financial-times/x-engine';
import c from 'classnames';

import styles from './styles.scss';

import { withThemes } from '../../themes/withThemes';

const Meta = ({ url, prefLabel, className, prefixLabel, suffixLabel, isCentered = false, hasBorder = false }) => {
	const displayPrimaryTopic = !!url && !!prefLabel;
	const hasAtLeastOneLabel = !!prefLabel || !!prefixLabel || !!suffixLabel;

	return hasAtLeastOneLabel ? (
		<div className={c(
			styles.meta,
			isCentered && styles.isCentered,
			hasBorder && styles.hasBorder,
			className,
		)}>
			{prefixLabel && <div className={styles.prefixLabel}>{prefixLabel}</div>}
			{displayPrimaryTopic && <a className={styles.mainLabel} href={url}>{prefLabel}</a>}
			{suffixLabel && <span className={styles.suffixLabel}>{suffixLabel}</span>}
		</div>
	) : null;
};

export default withThemes(Meta, styles);
