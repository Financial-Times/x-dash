import * as teaser from '@financial-times/x-teaser/stories';

const components = [ teaser ];

export default components.reduce(
	(all, book) => Object.assign(all,
		Object.keys(book).reduce(
			(collate, key) => Object.assign(collate, {
				[book[key].component]: Object.assign({}, collate[book[key].component], {
					[key]: book[key]
				})
			}),
			all
		)
	), {}
);
