import React, {Fragment} from 'react';
import Link from 'gatsby-link';
import map from 'lodash.map';
import c from 'classnames';
import styles from './sidebar.module.scss';

export const Item = ({title, children, href}) => <li className={styles.item}>
	{href
		? <Link className={styles.link} activeClassName={styles.active} to={href}>{title}</Link>
		: <span className={styles.header}>{title}</span>
	}

	{children &&
		<ul className={c(styles.nav, styles.nested)}>
			{children}
		</ul>
	}
</li>;

export const buildSidebarTree = (pages, sidebar = {children: {}}) => {
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

	return sidebar;
};

const NestedSidebar = ({children}) => <Fragment>
	{children && map(children,
		(child, title) => <Item key={title} title={title} href={child.href}>
			{Object.keys(child.children).length > 0 &&
				<NestedSidebar {...child} />
			}
		</Item>
	)}
</Fragment>;

const Sidebar = ({tree, className, children}) => <nav className={c('o-techdocs-sidebar', styles.sidebar, className)}>
	<ul className={c(styles.nav, styles.root)}>
		<NestedSidebar {...tree} />
	</ul>
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
