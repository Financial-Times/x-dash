import React, {Fragment} from 'react';
import Link from 'gatsby-link';
import map from 'lodash.map';
import c from 'classnames';
import styles from './sidebar.module.css';

export const Item = ({title, children, href}) => <li>
	{href
		? <Link to={href}>{title}</Link>
		: title
	}

	{children &&
		<ul className={c('o-techdocs-nav', styles.nested)}>
			{children}
		</ul>
	}
</li>;

export const SidebarWrapper = ({children}) => <nav className='o-techdocs-sidebar'>
	<ul className='o-techdocs-nav'>
		{children}
	</ul>
</nav>;

const buildSidebarTree = (pages, sidebar = {children: {}}) => {
	pages.forEach(({node: page}) => {
		if(page.context && page.context.sitemap) {
			const leaf = page.context.sitemap.breadcrumbs.reduce((leaf, crumb) => {
				if(!leaf.children[crumb]) {
					leaf.children[crumb] = {children: {}};
				}

				return leaf.children[crumb];
			}, sidebar);

			leaf.href = page.path;
		}
	});

	console.log(sidebar);
	return sidebar;
};

const NestedSidebar = ({children}) => <Fragment>
	{children && map(children,
		(child, title) => <Item key={title} title={title} href={child.href}>
			<NestedSidebar {...child} />
		</Item>
	)}
</Fragment>;

const Sidebar = ({pages}) => <SidebarWrapper>
	<NestedSidebar {...buildSidebarTree(pages)} />
</SidebarWrapper>;

export default Sidebar;
