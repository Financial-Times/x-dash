import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/menu';

export default ({ pageContext, data }) => {
	return (
		<Layout title={pageContext.pageName} sidebar={<Sidebar data={data.menu.edges} />}>
			<div dangerouslySetInnerHTML={{ __html: data.markdown.html }} />
		</Layout>
	);
};

export const pageQuery = graphql`
	query($path: String!) {
		markdown: markdownRemark(fields: { slug: { eq: $path } }) {
			html
		}
		menu: allDocsMenuYaml {
			edges {
				node {
					title
					items {
						title
						link
					}
				}
			}
		}
	}
`;
