import React from 'react';
import { Link } from 'gatsby';

const PageGroup = ({ title, items }) => (
	<>
		<li className="site-sidebar__menu-item site-sidebar__menu-item--heading">
			{title}
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

export default ({ data }) => (
	<div className="site-sidebar">
		<ul className="site-sidebar__menu">
			{data.map(({ node }, i) => (
				<PageGroup key={`section-${i}`} title={node.title} items={node.items} />
			))}
		</ul>
	</div>
);
