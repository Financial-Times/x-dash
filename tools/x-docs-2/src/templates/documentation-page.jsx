import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';

const Template = ({ pageContext, data }) => {
	return (
		<Layout title={pageContext.pageName}>
			<div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
		</Layout>
	);
};

export default Template;

export const pageQuery = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
		}
	}
`;
