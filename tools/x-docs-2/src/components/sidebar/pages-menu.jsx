import React from 'react';
import { Link } from 'gatsby';

const Group = ({ heading, items }) => (
	<>
		<li className="site-sidebar__item site-sidebar__item--heading">
			{heading}
		</li>
		{items.map((item, i) => (
			<li key={`link-${i}`} className="site-sidebar__item">
				<Link to={item.link} exact activeClassName="is-active">
					{item.title}
				</Link>
			</li>
		))}
	</>
);

export default ({ data }) => (
	<div className="site-sidebar">
		<ul className="site-sidebar__list">
			{data.map(({ node }, i) => (
				<Group key={`section-${i}`} heading={node.title} items={node.items} />
			))}
		</ul>
	</div>
);
