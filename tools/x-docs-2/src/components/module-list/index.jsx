import React from 'react';
import { Link } from 'gatsby';

export const ListItem = ({ node }) => (
	<li className="module-list__item">
		<Link to={node.fields.slug} className="module-list__item-link">
			<h2>{node.manifest.name}</h2>
			<p>{node.manifest.description}</p>
		</Link>
	</li>
);

export const List = ({ children }) => (
	<ul className="module-list">
		{children}
	</ul>
);
