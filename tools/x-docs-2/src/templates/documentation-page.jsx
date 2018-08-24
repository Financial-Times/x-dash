import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/pages-menu';

export default ({ pageContext, data }) => (
	<Layout title={pageContext.title} sidebar={<Sidebar data={data.menu.edges} />}>
		<div className="markdown" dangerouslySetInnerHTML={{ __html: data.markdown.html }} />
	</Layout>
);

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
