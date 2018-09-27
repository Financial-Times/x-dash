import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/module-menu';
import Subheadings from '../components/tertiary/subheadings';
import Links from '../components/tertiary/links';
import StoryViewer from '../components/story-viewer';

export default ({ pageContext, data, location }) => (
	<Layout
		title={pageContext.title}
		sidebar={
			<Sidebar
				heading={pageContext.source}
				items={data.modules.edges}
				location={location.pathname}
			/>
		}>
		<div className="content-layout">
			<main className="content-layout__main" role="main">
				<div className="content-layout__main-inner">
					<div className="markdown" dangerouslySetInnerHTML={{ __html: data.markdown.html }} />
					{data.storybook ? (
						<StoryViewer name={pageContext.title} stories={data.storybook.stories} />
					) : null}
				</div>
			</main>
			<div className="content-layout__tertiary">
				<div className="content-layout__tertiary-inner">
					<Links
						name={pageContext.title}
						manifest={data.npm.manifest}
						storybook={Boolean(data.storybook)}
					/>
					<Subheadings items={data.markdown.headings} demos={Boolean(data.storybook)} />
				</div>
			</div>
		</div>
	</Layout>
);

export const pageQuery = graphql`
	query($type: String!, $packagePath: String!, $readmePath: String!, $storiesPath: String!) {
		npm: npmPackage(fields: { slug: { eq: $packagePath } }) {
			manifest
		}
		markdown: markdownRemark(fields: { slug: { eq: $readmePath } }) {
			html
			headings {
				value
				depth
			}
		}
		storybook: stories(fields: { slug: { eq: $storiesPath } }) {
			stories
		}
		modules: allSitePage(filter: { context: { type: { eq: $type } } }) {
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
