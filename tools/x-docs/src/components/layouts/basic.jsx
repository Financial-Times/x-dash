import React from 'react';
import Helmet from 'react-helmet';
import Header from '../header';
import Footer from '../footer';

export default ({ title, children, sidebar }) => (
	<div className="basic-layout">
		<Helmet title={`${title} / x-dash`} />
		<div className="basic-layout__header">
			<Header showLogo={true} />
		</div>
		<div className="basic-layout__content">
			{children}
		</div>
		<div className="basic-layout__sidebar">
			{sidebar}
		</div>
		<div className="basic-layout__footer">
			<Footer />
		</div>
	</div>
);
