import React from 'react';
import { Link, withPrefix } from 'gatsby';

export default ({ showLogo }) => (
	<header className="site-header">
		<div className="site-header__masthead">
			<Link to="/">x-dash</Link>
		</div>
		{showLogo ? <img className="site-header__logo" src={withPrefix('/logo.png')} alt="" /> : null}
		<nav role="navigation" className="site-header__menu">
			<Link to="/docs" activeClassName="is-active">Docs</Link>
			<Link to="/components" activeClassName="is-active">Components</Link>
			<Link to="/packages" activeClassName="is-active">Packages</Link>
		</nav>
	</header>
);
