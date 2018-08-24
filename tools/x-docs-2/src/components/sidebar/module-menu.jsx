import React from 'react';
import { Link } from 'gatsby';
import GithubSlugger from 'github-slugger';

const createHash = (name) => {
	const slugger = new GithubSlugger();
	// As slugger checks if it is not duplicating created urls, like this:
	// const slugger = new GithubSlugger();
	// slugger.slug('url one') // url-one
	// slugger.slug('url one') // url-one-2
	// therefore there is a need to create a new class instance every time when the function is applied
	return slugger.slug(name)
};

const submenuItemOnClick = (e) => {
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

const Submenu = (items, maxDepth = 3) => {
	const headings = items.filter((item) => item.depth > 1 && item.depth <= maxDepth);

	return (
		<ul className="site-sidebar__menu site-sidebar__menu--submenu">
			{headings.map((item, i) => (
				<li key={`submenu-${i}`} className="site-sidebar__menu-item" style={submenuItemIndent(item.depth)}>
					<Link to={`#${createHash(item.value)}`} onClick={submenuItemOnClick}>
						{item.value}
					</Link>
				</li>
			))}
		</ul>
	);
};

const Sidebar = ({ heading, modules, submenu, location }) => (
	<div className="site-sidebar">
		<p className="site-sidebar__heading">{heading}</p>
		<ul className="site-sidebar__menu">
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
