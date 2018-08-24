import React from 'react';
import { Link } from 'gatsby';

export default () => (
	<header className="site-banner">
		<div className="site-banner__logo">
			<Link to="/">x-dash</Link>
		</div>
		<nav role="navigation" className="site-banner__menu">
			<Link to="/docs" activeClassName="is-active">Docs</Link>
			<Link to="/components" activeClassName="is-active">Components</Link>
			<Link to="/packages" activeClassName="is-active">Packages</Link>
			<a href="https://github.com/Financial-Times/x-dash">GitHub</a>
		</nav>
	</header>
);
