import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/module-list';

const ListStories = ({ stories }) => (
	<ul>
		{stories.map((story, i) => <li key={`story-${i}`}>{story}</li>)}
	</ul>
);

const Template = ({ pageContext, data }) => {
	return (
		<Layout
			title={pageContext.title}
			sidebar={
				<Sidebar data={data.relatedContent.edges}
					title={pageContext.source}
					menu={data.menu.edges}
				/>
			} >
			sidebar={<Sidebar data={data.allSitePage.edges} title={pageContext.source} />}>
			<div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
			<h2>Stories:</h2>
			{data.stories ? <ListStories stories={data.stories.stories} /> : null}
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
		}
		stories(fields: { slug: { eq: $storiesPath } }) {
			stories
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
