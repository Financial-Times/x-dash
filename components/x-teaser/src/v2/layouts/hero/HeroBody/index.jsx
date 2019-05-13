import { h } from '@financial-times/x-engine';
import c from 'classnames';

import { DataProvider } from '../../DataProvider';
import resolveTheme from '../resolve-theme';

import styles from './styles.scss';

const HeroBody = ({ isCentered = false, hasStandfirst = false, className, ...teaserData }) => (
	<DataProvider
		theme={resolveTheme(teaserData)}
		components={['Container', 'Standfirst', 'Meta', 'Title']}
		render={([Container, Standfirst, Meta, Title]) => (
			<Container className={c(styles.container, className)}>
				<Meta className={styles.heroMeta} isCentered={isCentered} hasBorder />
				<Title isCentered={isCentered} />
				{hasStandfirst && <Standfirst className={styles.standfirst} />}
			</Container>
		)}
		{...teaserData}
	/>
);

export default HeroBody;
