import React, {Fragment} from 'react';
import Link from 'gatsby-link';
import map from 'lodash.map';
import c from 'classnames';
import styles from './sidebar.module.scss';

export const ItemList = ({
	root, className, ...props
}) => <ul className={c(styles.nav, {[styles.root]: root}, className)} {...props} />

export const Item = ({title, children, supplementary, href, onClick, className}) => <li className={styles.item}>
	{href
		? <Link
			className={c(styles.link, className)}
			onClick={onClick}
			activeClassName={styles.active}
			to={href}
			exact
		>{title}</Link>
		: <span className={styles.header}>{title}</span>
	}

	{supplementary}

	{children &&
		<ItemList>
			{children}
		</ItemList>
	}
</li>;

export const buildSidebarTree = (pages, sidebar = {children: {}}) => {
	pages.forEach(({node: page}) => {
		if(page.context && page.context.sitemap) {
			const leaf = page.context.sitemap.breadcrumbs.reduce((leaf, crumb) => {
				if(!leaf.children[crumb]) {
					leaf.children[crumb] = {children: {}, label: page.context.title || crumb};
				}

				return leaf.children[crumb];
			}, sidebar);

			leaf.href = page.path;
		}
	});

	return sidebar;
};

export const NestedSidebar = ({children}) => <Fragment>
	{children && map(children,
		(child, title) => <Item key={title} title={child.label} href={child.href}>
			{Object.keys(child.children).length > 0 &&
				<NestedSidebar {...child} />
			}
		</Item>
	)}
</Fragment>;

const Sidebar = ({tree, className, children}) => <nav className={c('o-techdocs-sidebar', styles.sidebar, className)}>
	<ItemList root>
		{tree.label && <Item className={styles.topLevel} title={tree.label} href={tree.href} />}

		<NestedSidebar {...tree} />
	</ItemList>
</nav>;

export const sidebarProps = graphql`
	fragment SidebarProps on SitePage {
		id
		path
		context {
			sitemap {
				title
				breadcrumbs
			}
		}
	}
`

export default Sidebar;
