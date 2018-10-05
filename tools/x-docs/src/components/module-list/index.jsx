import React from 'react';
import { Link } from 'gatsby';

export default ({ items }) => (
	<ul className="module-list">
		{items.map(({ node }, i) => (
			<li key={`module-list-${i}`} className="module-list__item">
				<Link to={node.path} className="module-list__link">
					<h2 className="module-list__heading">{node.context.packageName}</h2>
					<p className="module-list__description">{node.context.packageDescription}</p>
				</Link>
			</li>
		))}
	</ul>
);
