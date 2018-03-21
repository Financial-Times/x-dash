import React, {Fragment} from 'react';
import Link from 'gatsby-link';

export const Item = ({children, href}) => <li>
	<Link to={href}>
		{children}
	</Link>
</li>;

export const Section = ({title, children}) => <li>
	<h3>{title}</h3>
	<ul>
		{children}
	</ul>
</li>;

const Sidebar = ({children}) => <nav>
	<ul>
		{children}
	</ul>
</nav>;

export default Sidebar;
