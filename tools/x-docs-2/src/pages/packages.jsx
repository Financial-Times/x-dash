import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/module-menu';
import { List, ListItem } from '../components/module-list';

export const query = graphql`
	query {
		modules: allSitePage(
			filter: { context: { type: { eq: "npm-package-packages" } } }
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
	<Layout title="Packages" sidebar={<Sidebar heading="Packages" modules={data.modules.edges} />}>
		<main className="content-container" role="main">
			<h1>Packages</h1>
			<List>
				{data.modules.edges.map(({ node }, i) => <ListItem key={`module-${i}`} node={node} />)}
			</List>
		</main>
	</Layout>
);
