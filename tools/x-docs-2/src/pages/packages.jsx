import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/list';
import { List, ListItem } from '../components/modules/list';

export const query = graphql`
	query {
		modules: allSitePage(
			filter: { context: { type: { eq: "npm-package" }, sourceName: { eq: "packages" } } }
		) {
			edges {
				node {
					path
					context {
						pageName
						packageName
					}
				}
			}
		}
	}
`;

export default ({ data }) => (
	<Layout title="Packages" sidebar={<Sidebar data={data.modules.edges} />}>
		<div className="">
			<h1>Packages</h1>
			<List>
				{data.modules.edges.map(({ node }, i) => <ListItem key={`module-${i}`} node={node} />)}
			</List>
		</div>
	</Layout>
);
