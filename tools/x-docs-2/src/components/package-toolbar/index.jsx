import React from 'react';
import { Link } from 'gatsby';

export default ({ name, manifest, stories }) => (
	<ul className="package-toolbar">
		<li className="package-toolbar__item package-toolbar__item--heading">
			Quick links:
		</li>
		<li className="package-toolbar__item">
			<a href={`https://www.npmjs.com/package/${manifest.name}`} rel="noopener noreferrer" target="_blank">NPM</a>
		</li>
		<li className="package-toolbar__item">
			<a href={manifest.homepage} rel="noopener noreferrer" target="_blank">GitHub</a>
		</li>
		{stories ? (
			<li className="package-toolbar__item">
				<Link to={`/storybook/index.html?selectedKind=${name}`} rel="noopener" target="_blank">Storybook</Link>
			</li>
		) : null}
	</ul>
);
