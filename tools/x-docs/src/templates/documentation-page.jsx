import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';
import Sidebar from '../components/sidebar/pages-menu';
import Subheadings from '../components/tertiary/subheadings';

export default ({ pageContext, data }) => (
	<Layout title={pageContext.title} sidebar={<Sidebar data={data.menu.edges} />}>
		<div className="content-layout">
			<main className="content-layout__main" role="main">
				<div className="content-layout__main-inner">
					<div className="markdown" dangerouslySetInnerHTML={{ __html: data.markdown.html }} />
				</div>
			</main>
			<div className="content-layout__tertiary">
				<div className="content-layout__tertiary-inner">
					<Subheadings items={data.markdown.headings} />
				</div>
			</div>
		</div>
	</Layout>
);

export const pageQuery = graphql`
	query($path: String!) {
		markdown: markdownRemark(fields: { slug: { eq: $path } }) {
			html
			headings {
				value
				depth
			}
		}
		menu: allDocsMenuYaml {
			edges {
				node {
					title
					items {
						title
						link
					}
				}
			}
		}
	}
`;
