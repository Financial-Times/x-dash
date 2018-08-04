import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/list';

const Template = ({ pageContext, data }) => {
	return (
		<Layout title={pageContext.pageName} sidebar={<Sidebar data={data.modules.edges} />}>
			<div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
		</Layout>
	);
};

export default Template;

export const pageQuery = graphql`
	query($path: String!, $sourceName: String!) {
		markdownRemark(fields: { slug: { eq: $path } }) {
			html
		}
		npmPackage(fields: { slug: { eq: $path } }) {
			manifest
		}
		modules: allSitePage(
			filter: { context: { type: { eq: "npm-package" }, sourceName: { eq: $sourceName } } }
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
