import React, {Fragment} from 'react';
import RehypeReact from 'rehype-react';
import c from 'classnames';
import styles from './blog.module.scss';

const renderAst = new RehypeReact({
  createElement: React.createElement,
}).Compiler;

export default ({data}) => {
	const { markdownRemark } = data; // data.markdownRemark holds our post data
	const { frontmatter, htmlAst, headings } = markdownRemark;

	const hideTitle = headings.some(
		({value, depth}) => depth === 1 && value === frontmatter.title
	);

	const renderedAst = renderAst(htmlAst);

	return <article className={c('o-techdocs-content', styles.content)}>
		{!hideTitle &&
			<h1>{frontmatter.title}</h1>
		}

		<Fragment>
			{renderedAst.props.children}
		</Fragment>
	</article>;
}

export const pageQuery = graphql`
query BlogPostByPath($path: String!) {
	markdownRemark(frontmatter: { path: { eq: $path } }) {
		htmlAst
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
