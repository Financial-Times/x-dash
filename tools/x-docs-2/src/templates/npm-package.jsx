import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/module-list';

const Template = ({ pageContext, data }) => {
	return (
		<Layout title={pageContext.pageName} sidebar={<Sidebar data={data.modules.edges} title={data.fields.sourceName} />}>
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
			fields {
				sourceName
			}
		}
		modules: allNpmPackage(
			filter: { private: { eq: false }, fields: { sourceName: { eq: $sourceName } } }
		) {
			edges {
				node {
					manifest
					fields {
						slug
					}
				}
			}
		}
	}
`;
