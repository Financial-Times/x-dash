import React from 'react';
import { Link } from 'gatsby';

const linkProps = {
	rel: 'noopener noreferrer',
	target: '_blank'
};

export default ({ name, manifest, storybook }) => (
	<div className="tertiary-menu">
		<p className="tertiary-menu__heading">Quick links:</p>
		<ul className="tertiary-menu__list">
			<li className="tertiary-menu__item">
				<a href={`https://www.npmjs.com/package/${manifest.name}`} {...linkProps}>
					NPM
				</a>
			</li>
			<li className="tertiary-menu__item">
				<a href={manifest.homepage} {...linkProps}>
					GitHub
				</a>
			</li>
			{storybook ? (
				<li className="tertiary-menu__item">
					<Link to={`/storybook/index.html?selectedKind=${name}`} {...linkProps}>
						Storybook
					</Link>
				</li>
			) : null}
		</ul>
	</div>
);
