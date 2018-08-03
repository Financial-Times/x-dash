import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/menu';

export default ({ pageContext, data }) => {
	return (
		<Layout title={pageContext.pageName}>
			<Sidebar data={[]} />
			<div dangerouslySetInnerHTML={{ __html: data.markdown.html }} />
		</Layout>
	);
};

export const pageQuery = graphql`
	query($path: String!) {
		markdown: markdownRemark(fields: { slug: { eq: $path } }) {
			html
		}
	}
`;
