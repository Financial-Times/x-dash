import React from 'react';
import { Link } from 'gatsby';

const createUrlFromName = (name) => {
	return name.toLowerCase().replace(/ /g, '-').replace(/[?!:%$'.,"…:]/g, '');
}

const buildListItem = (item, currentNode) => {
	return (
		<Link to={`${currentNode.path}#${createUrlFromName(item.value)}`}>
			<li>{item.value}</li>
		</Link>
	);
}

const buildSubheadingsList = (menu, currentNode) => {
	return menu.headings.map(item => {
		if (item.depth === 2) {
			return buildListItem(item, currentNode);
		} else if (item.depth === 3) {
			return (
				<ul>
					{ buildListItem(item, currentNode) }
				</ul>
			);
		}
		return null;
	});
}

const Sidebar = ({ data, title, menu, pageContext }) => (
	<ul className="site-sidebar">
		<li className="site-sidebar__item site-sidebar__item--title">{title || pageContext.source}</li>
		{ data.map(({ node }, i) => (
			<li key={`list-${i}`} className="site-sidebar__item site-sidebar__item--link">
				<Link to={node.path} exact activeClassName="is-active">
					{node.context.title}
				</Link>
				{ menu && menu.headings.length > 0 && pageContext && pageContext.source && pageContext.title && node.path === `/${pageContext.source}/${pageContext.title}` ? (
					<ul>
						{ buildSubheadingsList(menu, node) }
					</ul>
				) : null }
			</li>
		))}
	</ul>
);

export default Sidebar;
