import React from 'react';
import { Link } from 'gatsby';

const List = ({ data, title }) => (
	<ul className="site-sidebar">
		<li className="site-sidebar__item site-sidebar__item--title">{title}</li>
		{data.map(({ node }, i) => (
			<li key={`list-${i}`} className="site-sidebar__item site-sidebar__item--link">
				<Link to={node.fields.slug} exact activeClassName="is-active">
					{node.name}
				</Link>
			</li>
		))}
	</ul>
);

export default List;
