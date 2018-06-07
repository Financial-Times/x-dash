module.exports = {
	files: {
		allow: [
			'makefile',
			'tools/x-docs/.bowerrc',
			'tools/x-docs/LICENSE',
			'tools/x-docs/static/storybook',
			'tools/x-docs/static/components',
			'tools/x-docs/public-prod/x-dash',
			'packages/x-engine/.npmignore',
			'components/x-teaser/.npmignore',
			'__tests__/__snapshots__/snapshots.test.js.snap',
			'private/logos/Logo.pxm',
			'tools/x-workbench/static/components',
		],
		allowOverrides: []
	},
	strings: {
		deny: [],
		denyOverrides: [
			'aGKYNk494ZtyjntSrZ8Yj0CDU9BFzuiU', // .travis.yml:7
			'3SdUjhHAxPGyvtBZY1nGk0rcLn1uzh879tVPv8fz9cB5lWjDeI7mTJQ8ZRCosAhZWSRxIPnGHCi0iDOU', // .travis.yml:7
			'R2hCU/gLuDueGnY1dh5TxIYoVhqTaxJKxF8NFjUM', // .travis.yml:30
			'2qTH8JUKKRjuxPy7335Q3', // .travis.yml:30
			'7b55beac-38e7-11e8-9529-6286f384b7ce', // components/x-teaser/README.md:31
			'0e89d872-5711-457b-80b1-4ca0d8afea46', // __tests__/__snapshots__/snapshots.test.js.snap:339|377|782|820|1225|1263|1663|1701|2091|2129|2534|2572|2977|3015|3415|3453|3858|3896|4301|4339, components/x-teaser/stories/video.js:11
			'a25832ea-0053-11e8-9650-9c0ad2d7c5b5', // components/x-teaser/stories/article.js:28, components/x-teaser/stories/top-story.js:28
			'1005ca96-364b-11e8-8b98-2f31af407cc8', // components/x-teaser/stories/opinion.js:28
			'a27ce49b-85b8-445b-b883-db6e2f533194', // components/x-teaser/stories/video.js:28
			'7e97f5b6-578d-11e8-b8b2-d6ceb45fa9d0', // components/x-teaser/stories/package.js:28
			'1e6c6202-398e-11e8-907c-8c199a03988a' // readme.md:2
		]
	}
};
