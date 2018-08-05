import React from 'react';
import { Link } from 'gatsby';
import XLogo from '@financial-times/x-logo';

export default () => (
	<div className="hero">
		<div className="hero__container">
			<div className="hero__logo">
				<XLogo />
			</div>
			<div className="hero__content">
				<h1>x-dash</h1>
				<p>Shared front-end for FT.com and The App.</p>
				<Link to="/docs" className="button button--inverse">Get started</Link>
			</div>
		</div>
	</div>
);
