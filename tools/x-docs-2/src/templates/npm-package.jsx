import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/module-menu';

const ListStories = ({ stories }) => (
	<ul>
		{stories.map((story, i) => <li key={`story-${i}`}>{story}</li>)}
	</ul>
);

const Template = ({ pageContext, data, location }) => {
	return (
		<Layout
			title={pageContext.title}
			sidebar={
				<Sidebar
					heading={pageContext.source}
					modules={data.modules.edges}
					headings={data.markdownRemark.headings}
					location={location.pathname}
				/>
			}>
			<div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
			<h2>Stories:</h2>
			{data.storybook ? <ListStories stories={data.storybook.stories} /> : null}
		</Layout>
	);
};

export default Template;

export const pageQuery = graphql`
	query($type: String!, $packagePath: String!, $readmePath: String!, $storiesPath: String!) {
		npmPackage(fields: { slug: { eq: $packagePath } }) {
			manifest
		}
		markdownRemark(fields: { slug: { eq: $readmePath } }) {
			html
			headings {
				value
				depth
			}
		}
		storybook: stories(fields: { slug: { eq: $storiesPath } }) {
			stories
		}
		modules: allSitePage(
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
