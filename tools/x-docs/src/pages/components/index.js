import React from 'react';
import Content from '../../components/content';
import Link from 'gatsby-link';
import path from 'path';

const ComponentsPage = ({data}) => <Content>
	<h1>Components</h1>

	{data.allPackage.edges.map(({node}) => <Link key={node.id} to={`/components/${path.basename(node.pkgJson.name)}`}>
		<h2>{node.pkgJson.name}</h2>
		v{node.pkgJson.version}
		{node.pkgJson.description}
		{Object.keys(node.stories).length} demos
	</Link>)}

</Content>;

export default ComponentsPage;

export const query = graphql`
	query ComponentsData {
		allPackage(filter: {base: {eq: "components"}}) {
			edges {
				node {
					id
					stories
					pkgJson {
						name
						version
						description
					}
				}
			}
		}
	}
`;
