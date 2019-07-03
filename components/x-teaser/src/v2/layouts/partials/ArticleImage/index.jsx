import { h } from '@financial-times/x-engine';
import c from 'classnames';

import styles from './styles.scss';

import { DataProvider } from '../../DataProvider';

const ArticleImage = ({ className, ...teaserData }) => (
	<DataProvider
		components={['Image']}
		render={([Image]) => (
			<a
				href={teaserData.relativeUrl || teaserData.url}
				aria-hidden="true"
				data-trackable="image-link"
				tabIndex="-1"
			>
				<Image className={c(styles.image, className)} />
			</a>
		)}
		{...teaserData}
	/>
);

export default ArticleImage;
