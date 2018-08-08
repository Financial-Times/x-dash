import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/module-list';

const Template = ({ pageContext, data }) => {
	return (
		<Layout
			title={pageContext.title}
			sidebar={<Sidebar data={data.allSitePage.edges} title={pageContext.source} />}>
			<div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
		</Layout>
	);
};

export default Template;

export const pageQuery = graphql`
	query($type: String!, $manifestPath: String!, $readmePath: String!) {
		npmPackage(fields: { slug: { eq: $manifestPath } }) {
			manifest
		}
		markdownRemark(fields: { slug: { eq: $readmePath } }) {
			html
		}
		allSitePage(
			filter: { context: { type: { eq: $type } } }
		) {
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
