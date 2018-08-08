import React from 'react';
import { Link } from 'gatsby';

export const ListItem = ({ node }) => (
	<li className="module-list__item">
		<Link to={node.path} className="module-list__item-link">
			<h2>{node.context.packageName}</h2>
			<p>{node.context.packageDescription}</p>
		</Link>
	</li>
);

export const List = ({ children }) => (
	<ul className="module-list">
		{children}
	</ul>
);
