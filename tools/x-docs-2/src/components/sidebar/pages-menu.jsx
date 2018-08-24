import React from 'react';
import { Link } from 'gatsby';

const MenuSection = ({ title, items }) => (
	<>
		<li className="site-sidebar__menu-item">
			<span className="site-sidebar__menu-heading">{title}</span>
		</li>
		{items.map((item, i) => (
			<li key={`link-${i}`} className="site-sidebar__menu-item">
				<Link to={item.link} exact activeClassName="is-active">
					{item.title}
				</Link>
			</li>
		))}
	</>
);

const Menu = ({ data }) => (
	<div className="site-sidebar">
		<ul className="site-sidebar__menu">
			{data.map(({ node }, i) => (
				<MenuSection key={`section-${i}`} title={node.title} items={node.items} />
			))}
		</ul>
	</div>
);

export default Menu;
