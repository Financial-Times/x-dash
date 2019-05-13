import { h } from '@financial-times/x-engine';
import c from 'classnames';
import { DataProvider } from '../../DataProvider';

import styles from './styles.scss';

const Heading = ({ className, ...teaserData }) => (
	<DataProvider
		components={['Meta', 'Title']}
		render={([Meta, Title]) => (
			<div className={c(className, styles.container)}>
				<Meta className={styles.meta} />
				<Title />
			</div>
		)}
		{...teaserData}
	/>
);

export default Heading;
