import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/module-list';
import { List, ListItem } from '../components/module-list';

export const query = graphql`
	query {
		modules: allNpmPackage(
			filter: { private: { eq: false }, fields: { sourceName: { eq: "packages" } } }
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
	<Layout title="Packages" sidebar={<Sidebar data={data.modules.edges} title="Packages" />}>
		<div className="">
			<h1>Packages</h1>
			<List>
				{data.modules.edges.map(({ node }, i) => <ListItem key={`module-${i}`} node={node} />)}
			</List>
		</div>
	</Layout>
);
