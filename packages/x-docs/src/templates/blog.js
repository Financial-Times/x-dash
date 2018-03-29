import React from 'react';

export default ({data}) => {
	const { markdownRemark } = data; // data.markdownRemark holds our post data
	const { frontmatter, html, headings } = markdownRemark;

	const hideTitle = headings.some(
		({value, depth}) => depth === 1 && value === frontmatter.title
	);

	return <article className="o-techdocs-content">
		{!hideTitle &&
			<h1>{frontmatter.title}</h1>
		}

		<div
			className="blog-post-content"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	</article>;
}

export const pageQuery = graphql`
query BlogPostByPath($path: String!) {
	markdownRemark(frontmatter: { path: { eq: $path } }) {
		html
		frontmatter {
			path
			title
		}
		headings {
			value
			depth
		}
	}
}
`;
