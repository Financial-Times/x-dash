import React from 'react';
import { Link } from 'gatsby';

const List = ({ data }) => (
	<ul className="site-sidebar">
		{data.map(({ node }, i) => (
			<li key={`list-${i}`} className="site-sidebar__item site-sidebar__item--link">
				<Link to={node.path} exact activeClassName="is-active">
					{node.context.pageName}
				</Link>
			</li>
		))}
	</ul>
);

export default List;
