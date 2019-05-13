import { h } from '@financial-times/x-engine';
import c from 'classnames';

import ArticleImage from '../../partials/ArticleImage';
import Body from '../../partials/Body';

import styles from './styles.scss';

const Horizontal = ({ className, hasImage = false, ...teaserData }) => (
	<div className={c(styles.container, className)}>
		<Body hasStandfirst className={styles.body} {...teaserData} />

		{hasImage && <ArticleImage className={styles.image} {...teaserData} />}
	</div>
);

export default Horizontal;
