import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import { List, ListItem } from '../components/modules/list';

export const query = graphql`
	query {
		allSitePage(filter: { context: { type: { eq: "module" }, group: { eq: "components" } } }) {
			edges {
				node {
					path
					context {
						title
					}
				}
			}
		}
	}
`;

export default ({ data }) => (
	<Layout title="Components">
		<div className="">
			<List>
				{data.allSitePage.edges.map((item, i) => <ListItem key={`module-${i}`} data={item} />)}
			</List>
		</div>
	</Layout>
);
