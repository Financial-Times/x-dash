import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/module-list';
import { List, ListItem } from '../components/module-list';

export const query = graphql`
	{
		modules: allNpmPackage(
			filter: { private: { eq: false }, fields: { source: { eq: "components" } } }
		) {
			edges {
				node {
					name
					manifest
					fields {
						slug
					}
				}
			}
		}
	}
`;

export default ({ data }) => (
	<Layout title="Components" sidebar={<Sidebar data={data.modules.edges} title="Components" />}>
		<h1>Components</h1>
		<List>
			{data.modules.edges.map(({ node }, i) => <ListItem key={`module-${i}`} node={node} />)}
		</List>
	</Layout>
);
