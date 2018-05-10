import React from 'react';
import PackageCard from '../package-card';
import styles from './packages.module.scss';

const Packages = ({packages}) => <div>
	<h1 className={styles.heading}>Components</h1>

	<div className={styles.grid}>
		{packages.edges.map(
			({node}) => <PackageCard key={node.id} {...node} {...node.pkgJson} />
		)}
	</div>
</div>;

export default Packages;

export const packageCard = graphql`
	fragment PackageCards on PackageConnection {
		edges {
			node {
				...PackageCard
			}
		}
	}
`
