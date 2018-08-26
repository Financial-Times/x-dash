import React from 'react';

const createLink = (component, story) => {
	return `/storybook/index.html?selectedKind=${component}&selectedStory=${story}`;
};

export default ({ name, items }) => (
	<div className="tertiary-menu">
		<p className="tertiary-menu__heading">Component Demos:</p>
		<ul className="tertiary-menu__list">
			{items.map((item, i) => (
				<li
					key={`stories-${i}`}
					className="tertiary-menu__item">
					<a href={createLink(name, item)} rel="noopener noreferrer" target="_blank">
						{item}
					</a>
				</li>
			))}
		</ul>
	</div>
);
