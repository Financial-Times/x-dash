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

	document.querySelector(e.currentTarget.hash).scrollIntoView({
		behavior: 'smooth'
	});
};

export default (items, minDepth = 2, maxDepth = 3) => {
	const headings = items.filter((item) => item.depth >= minDepth && item.depth <= maxDepth);

	return (
		<ul className="site-sidebar__list site-sidebar__list--submenu">
			<li className="site-sidebar__item site-sidebar__item--heading">
				On this page:
			</li>
			{headings.map((item, i) => (
				<li
					key={`submenu-${i}`}
					className="site-sidebar__item"
					style={{ paddingLeft: item.depth - minDepth + 'em' }}>
					<a href={createHash(item.value)} onClick={scrollOnClick}>
						{item.value}
					</a>
				</li>
			))}
		</ul>
	);
};
