import React from 'react';
import Helmet from 'react-helmet';
import Header from '../header';
import Footer from '../footer';

export default ({ title, children }) => (
	<div className="splash-layout">
		<Helmet title={`${title} / x-dash`} />
		<div className="splash-layout__header">
			<Header />
		</div>
		<main className="splash-layout__hero" role="main">
			{children}
		</main>
		<div className="splash-layout__footer">
			<Footer />
		</div>
	</div>
);
