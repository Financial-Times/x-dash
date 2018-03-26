import React, {Fragment} from 'react';
import Link from 'gatsby-link';
import map from 'lodash.map';

export const Item = ({children, href}) => <li>
	<Link to={href}>
		{children}
	</Link>
</li>;

export const Section = ({title, children}) => <li>
	<h3>{title}</h3>
	<ul className='o-techdocs-nav o-techdocs-nav--sub'>
		{children}
	</ul>
</li>;

export const SidebarWrapper = ({children}) => <nav className='o-techdocs-sidebar'>
	<ul className='o-techdocs-nav'>
		{children}
	</ul>
</nav>;

const buildSidebarTree = (pages, sidebar = {pages: [], children: {}}) => {
	pages.forEach(({node: page}) => {
		if(page.context && page.context.sitemap) {
			const leaf = page.context.sitemap.breadcrumbs.reduce((leaf, crumb) => {
				if(!leaf.children[crumb]) {
					leaf.children[crumb] = {pages: [], children: {}};
				}

				return leaf.children[crumb];
			}, sidebar);

			leaf.pages.push(page);
		}
	});

	return sidebar;
};

const NestedSidebar = ({pages, children}) => <Fragment>
	{pages.map(({id, path, context}) => <Item key={id} href={path}>
		{context.sitemap.title}
	</Item>)}

	{children && map(children,
		(child, title) => <Section key={title} title={title}>
			<NestedSidebar {...child} />
		</Section>
	)}
</Fragment>;

const Sidebar = ({pages}) => <SidebarWrapper>
	<NestedSidebar {...buildSidebarTree(pages)} />
</SidebarWrapper>;

export default Sidebar;
