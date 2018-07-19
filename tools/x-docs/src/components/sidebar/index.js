import React, {Fragment} from 'react';
import Link from 'gatsby-link';
import orderBy from 'lodash.orderby';
import c from 'classnames';
import styles from './sidebar.module.scss';

export const ItemList = ({
	root, className, ...props
}) => <ul className={c(styles.nav, {[styles.root]: root}, className)} {...props} />

export const Item = ({title, children, supplementary, href, onClick, className, order}) => <li className={styles.item}>
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
					leaf.children[crumb] = {children: {}, label: crumb};
				}

				return leaf.children[crumb];
			}, sidebar);

			leaf.href = page.path;
			leaf.order = page.context.sitemap.order || Infinity;
		}
	});

	return sidebar;
};

export const NestedSidebar = ({children}) => <Fragment>
	{children &&
		orderBy(children, ['order', 'label'], ['asc', 'asc']).map(
			(child) => <Item key={child.label} title={child.label} href={child.href} order={child.order}>
				{Object.keys(child.children).length > 0 &&
					<NestedSidebar {...child} />
				}
			</Item>
		)
	}
</Fragment>;

const Sidebar = ({tree, className }) => <nav className={c('o-techdocs-sidebar', styles.sidebar, className)}>
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
				order
			}
		}
	}
`

export default Sidebar;
