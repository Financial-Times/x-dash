import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import update from 'lodash.update';
import map from 'lodash.map';

import Header from '../components/header';
import Sidebar, {Item, Section} from '../components/sidebar';

const buildSidebarCategories = pages => pages.reduce(
	(sidebar, {node: page}) => page.context && page.context.sitemap ? update(
		sidebar,
		page.context.sitemap.breadcrumbs,
		(sectionPages = []) => sectionPages.concat(page)
	) : sidebar,
	{}
);

const NestedSidebar = ({sections}) => <Fragment>
	{Array.isArray(sections)
		? sections.map(({id, context, path}) => <Item key={id} href={path}>
			{context.sitemap.title}
		</Item>)
		: map(
			sections,
			(section, title) => <Section key={title} title={title}>
				<NestedSidebar sections={section} />
			</Section>
		)
	}
</Fragment>;

const TemplateWrapper = ({children, data}) => (
	<div>
		<Helmet
			title="Gatsby Default Starter"
			meta={[
				{ name: 'description', content: 'Sample' },
				{ name: 'keywords', content: 'sample, something' },
			]}
		/>

		<Header />

		<Sidebar>
			<NestedSidebar sections={buildSidebarCategories(data.allSitePage.edges)} />
		</Sidebar>

		<div
			style={{
				margin: '0 auto',
				maxWidth: 960,
				padding: '0px 1.0875rem 1.45rem',
				paddingTop: 0,
			}}
		>
			{children()}
		</div>
	</div>
);

TemplateWrapper.propTypes = {
	children: PropTypes.func,
};

export default TemplateWrapper;

export const query = graphql`
	query SidebarPages {
		allSitePage {
			edges {
				node {
					id
					path
					context {
						sitemap {
							title
							breadcrumbs
						}
					}
				}
			}
		}
	}
`;
