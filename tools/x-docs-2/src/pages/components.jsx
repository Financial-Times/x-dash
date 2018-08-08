import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/module-list';
import { List, ListItem } from '../components/module-list';

export const query = graphql`
	query {
		allSitePage(
			filter: { context: { type: { eq: "npm-package-components" } } }
		) {
			edges {
				node {
					path
					context {
						title
						packageName
						packageDescription
					}
				}
			}
		}
	}
`;

export default ({ data }) => (
	<Layout title="Components" sidebar={<Sidebar data={data.allSitePage.edges} title="Components" />}>
		<h1>Components</h1>
		<List>
			{data.allSitePage.edges.map(({ node }, i) => <ListItem key={`module-${i}`} node={node} />)}
		</List>
	</Layout>
);
