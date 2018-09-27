import React from 'react';
import GithubSlugger from 'github-slugger';

const createHash = (name) => {
	// This is the same module as used by gatsby-remark-autolink-headers
	const slugger = new GithubSlugger();
	// This module checks if it is duplicating created URLs, like this:
	// slugger.slug('url one') // url-one
	// slugger.slug('url one') // url-one-2
	// Therefore we need to create a new class instance every time the function is applied
	return '#' + slugger.slug(name);
};

const scrollOnClick = (e) => {
	e.preventDefault();

	const target = document.querySelector(e.currentTarget.hash);

	target &&
		target.scrollIntoView({
			behavior: 'smooth'
		});
};

export default ({ items, demos = false, minDepth = 2, maxDepth = 3 }) => {
	const headings = items.filter((item) => item.depth >= minDepth && item.depth <= maxDepth);

	if (headings.length === 0) {
		// You must explicitly return null for empty nodes
		return null;
	}

	return (
		<div className="tertiary-menu">
			<p className="tertiary-menu__heading">On this page:</p>
			<ul className="tertiary-menu__list">
				{headings.map((item, i) => (
					<li
						key={`headings-${i}`}
						className="tertiary-menu__item"
						style={{ paddingLeft: item.depth - minDepth + 'em' }}>
						<a href={createHash(item.value)} onClick={scrollOnClick}>
							{item.value}
						</a>
					</li>
				))}
				{demos ? (
					<li className="tertiary-menu__item">
						<a href="#component-demos" onClick={scrollOnClick}>Component demos</a>
					</li>
				) : null}
			</ul>
		</div>
	);
};
