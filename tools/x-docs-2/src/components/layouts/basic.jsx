import React from 'react';
import Helmet from 'react-helmet';
import Header from '../header';
import Footer from '../footer';

export default ({ title, children, sidebar }) => (
	<div className="site-layout">
		<Helmet title={`${title} / x-dash`} />
		<header className="site-layout__header">
			<Header />
		</header>
		<main className="site-layout__content" role="main">
			<div className="site-layout__content--inner">
				{children}
			</div>
		</main>
		<div className="site-layout__sidebar" role="complementary">
			{sidebar}
		</div>
		<footer className="site-layout__footer" role="contentinfo">
			<Footer />
		</footer>
	</div>
);
