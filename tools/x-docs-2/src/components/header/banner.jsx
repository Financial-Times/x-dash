import React from 'react';
import { Link } from 'gatsby';

export default () => (
	<div className="site-banner">
		<div className="site-banner__logo">
			x-dash
		</div>
		<nav role="nav" className="site-banner__navigation">
			<Link to="/docs">Docs</Link>
			<Link to="/components">Components</Link>
			<Link to="/packages">Packages</Link>
		</nav>
	</div>
);
