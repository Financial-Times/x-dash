import { h } from '@financial-times/x-engine';
import c from 'classnames';

import { DataProvider } from '../../DataProvider';

import HeroBody from '../HeroBody';
import ArticleImage from '../../partials/ArticleImage';
import resolveTheme from '../resolve-theme';

import styles from './styles.scss';

const HeroWithImage = ({ className, ...teaserData }) => (
	<DataProvider
		theme={resolveTheme(teaserData)}
		components={['Container']}
		render={([Container]) => (
			<div className={c(styles.container, className)}>
				<Container hasHalfBackground>
					<ArticleImage className={styles.protrudingImage} {...teaserData} />
				</Container>

				<HeroBody className={styles.content} isCentered {...teaserData} />
			</div>
		)}
		{...teaserData}
	/>
);

export default HeroWithImage;
