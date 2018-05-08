import React from 'react';
import Content from '../../components/content';
import PackageCard from '../../components/package-card';
import styles from './components.module.scss';

const ComponentsPage = ({data}) => <div>
	<h1 className={styles.heading}>Components</h1>

	{data.allPackage.edges.map(
		({node}) => <PackageCard key={node.id} {...node} {...node.pkgJson} />
	)}
</div>;

export default ComponentsPage;

export const query = graphql`
	query ComponentsData {
		allPackage(filter: {base: {eq: "components"}}) {
			edges {
				node {
					...PackageCard
				}
			}
		}
	}
`;
