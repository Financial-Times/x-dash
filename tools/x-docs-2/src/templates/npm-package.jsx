import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/module-list';

const Template = ({ pageContext, data }) => {
	return (
		<Layout
			title={pageContext.title}
			sidebar={<Sidebar data={data.relatedContent.edges} title={pageContext.source} />}>
			<div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
		</Layout>
	);
};

export default Template;

export const pageQuery = graphql`
	query($path: String!, $source: String!) {
		markdownRemark(fields: { slug: { eq: $path } }) {
			html
		}
		npmPackage(fields: { slug: { eq: $path } }) {
			manifest
		}
		relatedContent: allNpmPackage(
			filter: { private: { eq: false }, fields: { source: { eq: $source } } }
		) {
			edges {
				node {
					name
					fields {
						slug
					}
				}
			}
		}
		menu: allMarkdownRemark(
			filter: { fields: { source: { eq: $source } } }
		) {
			edges {
				node {
					id
					headings {
						value
						depth
					}
				}
			}
		}
	}
`;
