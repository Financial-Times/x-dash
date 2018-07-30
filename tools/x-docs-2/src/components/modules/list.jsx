import React from 'react';
import { Link } from 'gatsby';

export const ListItem = ({ data }) => (
	<li className="module-list__item">
		<Link to={data.node.path}>{data.node.context.title}</Link>
	</li>
);

export const List = ({ items, children }) => (
	<ul className="module-list">
		{children}
	</ul>
);
