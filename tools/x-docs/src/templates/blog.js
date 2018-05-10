import React, {Fragment} from 'react';
import RehypeReact from 'rehype-react';
import Content from '../components/content';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styles from './blog.module.scss';

import './prism-origami.scss';

const MaybeLink = ({href, ...props}) => {
	if(href.startsWith('/') && href !== '/storybook') {
		return <Link {...props} to={href} />;
	}

	if(href === '/storybook') {
		href = '/storybook/index.html';
	}

	return <a href={href} {...props} />;
};

const renderAst = new RehypeReact({
	createElement: React.createElement,
	components: {
		'a': MaybeLink,
	}
}).Compiler;

export default ({data}) => {
	const { markdownRemark } = data;
	const { frontmatter, htmlAst, headings, timeToRead, wordCount: {words} } = markdownRemark;

	const hideTitle = headings.some(
		({value, depth}) => depth === 1
	);

	const renderedAst = renderAst(htmlAst);
	const body = renderedAst.type === 'div'
		? renderedAst.props.children
		: [renderedAst];

	const readingInfo = timeToRead > 1 || words > 50
		? <span className={styles.readingInfo}>
			{timeToRead} min read ◆ {words} words
		</span>
		: null;

	if(hideTitle) {
		const title = body.find(
			el => el.type === 'h1'
		);

		title.props.children.push(readingInfo);
	}

	return <Content>
		<Helmet title={`x-dash ◆ ${frontmatter.title}`} />

		{!hideTitle &&
			<h1>
				{frontmatter.title}
				{readingInfo}
			</h1>
		}

		<Fragment>
			{body}
		</Fragment>
	</Content>;
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
		timeToRead,
		wordCount {
			words
		}
	}
}
`;
