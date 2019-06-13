import { h } from '@financial-times/x-engine';
import c from 'classnames';

import { DataProvider } from '../../DataProvider';
import Heading from '../../partials/Heading';

import styles from './styles.scss';

const MoreFrom = ({ className, ...teaserData }) => (
	<DataProvider
		components={['Container']}
		render={([Container]) => (
			<Container className={c(styles.container, className)}>
				<Heading {...teaserData} />
			</Container>
		)}
		{...teaserData}
	/>
);

export default MoreFrom;
