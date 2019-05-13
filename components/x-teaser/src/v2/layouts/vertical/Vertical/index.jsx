import { h } from '@financial-times/x-engine';
import c from 'classnames';

import ArticleImage from '../../partials/ArticleImage';
import Body from '../../partials/Body';

import styles from './styles.scss';

const Vertical = ({ className, hasStandfirst = false, isPadded = false, hasImage = false, ...teaserData }) => (
	<div className={c(styles.container, className)}>
		{hasImage && <ArticleImage className={styles.image} {...teaserData} />}

		<Body
			hasStandfirst={hasStandfirst}
			className={c(
				styles.body,
				isPadded ? styles.isPadded : styles.isTopAndBottomPadded)
			}
			{...teaserData}
		/>
	</div>
);

export default Vertical;
