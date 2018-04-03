const groupBy = require('lodash.groupby');

module.exports = () => [
	require('@financial-times/x-teaser/stories'),
].reduce(
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
