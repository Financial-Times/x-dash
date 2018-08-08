import React from 'react';
import { Link } from 'gatsby';

const createUrlFromName = (name) => {
	return name.toLowerCase().replace(/ /g, '-');
}

const buildListItem = (item, currentNode) => {
	return (
		<Link to={`${currentNode.fields.slug}#${createUrlFromName(item.value)}`}>
			<li>{item.value}</li>
		</Link>
	);
}

const buildSubheadingsList = (menu, currentNode) => {
	const currentMenu = menu.filter(item => item.node.headings[0].value === currentNode.name)[0].node.headings;
	return currentMenu.map(item => {
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

const Sidebar = ({ data, title, menu }) => (
	<ul className="site-sidebar">
		<li className="site-sidebar__item site-sidebar__item--title">{title}</li>
		{data.map(({ node }, i) => (
			<li key={`list-${i}`} className="site-sidebar__item site-sidebar__item--link">
				<Link to={node.path} exact activeClassName="is-active">
					{node.context.title}
				</Link>
				{ menu && node.fields.slug === document.location.pathname ? (
					<ul>
						{ buildSubheadingsList(menu, node) }
					</ul>
				) : null }
			</li>
		))}
	</ul>
);

export default Sidebar;
