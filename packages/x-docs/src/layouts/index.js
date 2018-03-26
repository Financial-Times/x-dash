import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import update from 'lodash.update';
import map from 'lodash.map';

import Header from '../components/header';
import Sidebar, {Item, Section} from '../components/sidebar';

const buildSidebarCategories = (pages, sidebar = {item: null, children: {}}) => {
	pages.forEach(({node: page}) => {
		if(page.context && page.context.sitemap) {
			const leaf = page.context.sitemap.breadcrumbs.reduce((leaf, crumb) => {
				if(!leaf.children[crumb]) {
					leaf.children[crumb] = {item: null, children: {}};
				}

				return leaf.children[crumb];
			}, sidebar);

			leaf.item = page;
		}
	});

	return sidebar;
};

const NestedSidebar = ({item, children}) => <Fragment>
	{item && <Item key={item.id} href={item.path}>
		{item.context.sitemap.title}
	</Item>}

	{children && map(children,
		(child, title) => <Section key={title} title={title}>
			<NestedSidebar {...child} />
		</Section>
	)}
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
			<NestedSidebar {...buildSidebarCategories(data.allSitePage.edges)} />
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
