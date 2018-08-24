import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/module-menu';
import PackageToolbar from '../components/package-toolbar';

export default ({ pageContext, data, location }) => (
	<Layout
		title={pageContext.title}
		sidebar={
			<Sidebar
				heading={pageContext.source}
				modules={data.modules.edges}
				location={location.pathname}
				headings={data.markdownRemark.headings}
			/>
		}>
		<main className="readable-container" role="main">
			<PackageToolbar
				name={pageContext.title}
				manifest={data.npmPackage.manifest}
				stories={data.storybook ? data.storybook.stories : null}
			/>
			<div className="markdown" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
		</main>
	</Layout>
);

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
