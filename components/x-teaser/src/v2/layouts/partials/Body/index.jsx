import { h } from '@financial-times/x-engine';
import c from 'classnames';
import { DataProvider } from '../../DataProvider';
import Heading from '../Heading';

import styles from './styles.scss';

const Body = ({ hasStandfirst = false, className, ...teaserData }) => (
	<DataProvider
		components={['Container', 'Standfirst', 'Timestamp']}
		render={([Container, Standfirst, Timestamp]) => (
			<Container className={c(className, styles.container)}>
				<div className={styles.topContent}>
					<Heading {...teaserData} />
					{hasStandfirst && <Standfirst className={styles.standfirst} />}
				</div>

				<Timestamp className={styles.timestamp} />
			</Container>
		)}
		{...teaserData}
	/>
);

export default Body;
