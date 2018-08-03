import React from 'react';
import { Link } from 'gatsby';

export const ListItem = ({ node }) => (
	<li className="module-list__item">
		<Link to={node.path}>{node.context.pageName}</Link>
	</li>
);

export const List = ({ items, children }) => (
	<ul className="module-list">
		{children}
	</ul>
);
