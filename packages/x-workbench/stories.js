const components = [
	require('@financial-times/x-teaser/stories')
];

module.exports = components.reduce(
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
