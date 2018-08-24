import React from 'react';
import { Link } from 'gatsby';
import GithubSlugger from 'github-slugger';

const submenuItemHash = (name) => {
	// This is the same module as used by gatsby-remark-autolink-headers
	const slugger = new GithubSlugger();
	// This module checks if it is duplicating created URLs, like this:
	// slugger.slug('url one') // url-one
	// slugger.slug('url one') // url-one-2
	// Therefore we need to create a new class instance every time the function is applied
	return '#' + slugger.slug(name);
};

const submenuItemClick = (e) => {
	e.preventDefault();

	document.querySelector(e.currentTarget.hash).scrollIntoView({
		behavior: 'smooth'
	});
};

const submenuItemIndent = (depth) => {
	return {
		paddingLeft: `${depth - 1}em`
	};
};

const Submenu = (items, minDepth = 2, maxDepth = 3) => {
	const headings = items.filter((item) => item.depth >= minDepth && item.depth <= maxDepth);

	return (
		<ul className="site-sidebar__menu site-sidebar__menu--submenu">
			<li className="site-sidebar__menu-item">
				<span className="site-sidebar__menu-heading">On this page:</span>
			</li>
			{headings.map((item, i) => (
				<li key={`submenu-${i}`} className="site-sidebar__menu-item" style={submenuItemIndent(item.depth)}>
					<a href={submenuItemHash(item.value)} onClick={submenuItemClick}>
						{item.value}
					</a>
				</li>
			))}
		</ul>
	);
};

const Sidebar = ({ heading, modules, submenu, location }) => (
	<div className="site-sidebar">
		<ul className="site-sidebar__menu site-sidebar__menu--sticky">
			<li className="site-sidebar__menu-item">
				<span className="site-sidebar__menu-heading">{heading}</span>
			</li>
			{modules.map(({ node }, i) => (
				<li key={`menu-${i}`} className="site-sidebar__menu-item">
					<Link to={node.path} exact activeClassName="is-active">
						{node.context.title}
					</Link>
					{submenu && submenu.length > 0 && node.path === location ? Submenu(submenu) : null}
				</li>
			))}
		</ul>
	</div>
);

export default Sidebar;
