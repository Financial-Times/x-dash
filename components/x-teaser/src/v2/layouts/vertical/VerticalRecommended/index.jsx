import { h } from '@financial-times/x-engine';
import c from 'classnames';

import { DataProvider } from '../../DataProvider';
import ArticleImage from '../../partials/ArticleImage';
import Heading from '../../partials/Heading';

import styles from './styles.scss';

const VerticalRecommended = ({ className, ...teaserData }) => (
	<DataProvider
		components={['Container']}
		render={([Container]) => (
			<div className={c(styles.container, className)}>
				<ArticleImage className={styles.image} {...teaserData} />

				<Container className={c(styles.content)}>
					<Heading {...teaserData} />
				</Container>
			</div>
		)}
		{...teaserData}
	/>
);

export default VerticalRecommended;
