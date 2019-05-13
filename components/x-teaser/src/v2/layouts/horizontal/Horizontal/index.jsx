import { h } from '@financial-times/x-engine';
import c from 'classnames';

import ArticleImage from '../../partials/ArticleImage';
import Body from '../../partials/Body';

import styles from './styles.scss';

const Horizontal = ({ className, hasImage = false, hasStandfirst = false, ...teaserData }) => (
	<div className={c(styles.container, className)}>
		{hasImage && <ArticleImage className={styles.image} {...teaserData} />}

		<Body hasStandfirst={hasStandfirst} className={styles.body} {...teaserData} />
	</div>
);

export default Horizontal;
