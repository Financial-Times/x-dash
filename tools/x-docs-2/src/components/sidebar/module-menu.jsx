import React from 'react';
import { Link } from 'gatsby';
import SubmenuHeadings from './submenu-headings';

export default ({ heading, modules, headings, location }) => (
	<div className="site-sidebar">
		<ul className="site-sidebar__menu site-sidebar__menu--sticky">
			<li className="site-sidebar__menu-item site-sidebar__menu-item--heading">
				{heading}
			</li>
			{modules.map(({ node }, i) => (
				<li key={`menu-${i}`} className="site-sidebar__menu-item">
					<Link to={node.path} exact activeClassName="is-active">
						{node.context.title}
					</Link>
					{headings && headings.length > 0 && node.path === location ? SubmenuHeadings(headings) : null}
				</li>
			))}
		</ul>
	</div>
);
