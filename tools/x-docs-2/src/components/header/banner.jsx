import React from 'react';
import { Link } from 'gatsby';

export default () => (
	<div className="site-banner">
		<div className="site-banner__logo">
			x-dash
		</div>
		<nav role="navigation" className="site-banner__menu">
			<Link to="/docs">Docs</Link>
			<Link to="/components">Components</Link>
			<Link to="/packages">Packages</Link>
		</nav>
	</div>
);
