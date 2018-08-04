import React from 'react';
import { Link } from 'gatsby';

const MenuSection = ({ title, items }) => (
	<>
		<li className="site-sidebar__item site-sidebar__item--title">{title}</li>
		{items.map((item, i) => (
			<li key={`link-${i}`} className="site-sidebar__item site-sidebar__item--link">
				<Link to={item.link} exact activeClassName="is-active">
					{item.title}
				</Link>
			</li>
		))}
	</>
);

export default ({ data }) => (
	<ul className="site-sidebar">
		{data.map(({ node }, i) => (
			<MenuSection key={`section-${i}`} title={node.title} items={node.items} />
		))}
	</ul>
);
