import React from 'react';
import { Link } from 'gatsby';

import GithubSlugger from 'github-slugger';

const createUrlFromName = (name) => {
	const slugger = new GithubSlugger();
	// As slugger checks if it is not duplicating created urls, like this:
	// const slugger = new GithubSlugger();
	// slugger.slug('url one') // url-one
	// slugger.slug('url one') // url-one-2
	// therefore there is a need to create a new class instance every time when the function is applied
	return slugger.slug(name)
}

const reactToClick = (e, link) => {
	e.preventDefault();
	document.querySelector(`#${link}`).scrollIntoView({
		behavior: 'smooth'
	});
}

const buildListItem = (item, currentNode) => {
	const url = createUrlFromName(item.value);
	return (
		<Link to={`${currentNode.path}#${url}`} key={item.value} onClick={(e) => reactToClick(e, url)}>
			<li>{item.value}</li>
		</Link>
	);
}

const recursiveBulletsGenerator = (item, prevDepth, currentNode) => {
	if (item.depth > 1) {
		if (item.depth > prevDepth) {
			return (
				<ul key={item.value}>
					{ recursiveBulletsGenerator(item, prevDepth + 1, currentNode) }
				</ul>
			);
		} else return buildListItem(item, currentNode); 
	} else return null;
}

const buildSubheadingsList = (menu, currentNode) => {
	return menu.headings.map(item => {
		return (
			<ul key={item.value}>
				{ recursiveBulletsGenerator(item, 2, currentNode) }
			</ul>
		);
	});
}

const Sidebar = ({ data, title, menu, location }) => (
	<ul className="site-sidebar">
		<li className="site-sidebar__item site-sidebar__item--title">{title}</li>
		{ data.map(({ node }, i) => (
			<li key={`list-${i}`} className="site-sidebar__item site-sidebar__item--link">
				<Link to={node.path} exact activeClassName="is-active">
					{node.context.title}
				</Link>
				{ menu && menu.headings.length > 0 && node.path === location ? buildSubheadingsList(menu, node) : null }
			</li>
		))}
	</ul>
);

export default Sidebar;
