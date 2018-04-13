module.exports = {
	files: {
		allow: [
			'packages/x-docs/.bowerrc',
			'packages/x-docs/LICENSE',
			'packages/x-docs/static/storybook',
			'packages/x-docs/travis_deploy_key.enc',
			'packages/x-docs/travis_deploy_key.pub',
			'packages/x-engine/.npmignore',
			'packages/x-teaser/.npmignore',
			'private/logos/Logo.pxm',
			'packages/x-teaser/tests/__snapshots__/snapshots.test.js.snap'
		],
		allowOverrides: []
	},
	strings: {
		deny: [],
		denyOverrides: [
			'7b55beac-38e7-11e8-9529-6286f384b7ce', // packages/x-teaser/README.md:31
			'a25832ea-0053-11e8-9650-9c0ad2d7c5b5', // packages/x-teaser/stories/article.js:28, packages/x-teaser/stories/top-story.js:28, private/ssr-benchmark/mocks/list.js:25|53
			'1005ca96-364b-11e8-8b98-2f31af407cc8', // packages/x-teaser/stories/opinion.js:28
			'0e89d872-5711-457b-80b1-4ca0d8afea46', // packages/x-teaser/stories/video.js:11, private/ssr-benchmark/mocks/list.js:82
			'a27ce49b-85b8-445b-b883-db6e2f533194', // packages/x-teaser/stories/video.js:28, private/ssr-benchmark/mocks/list.js:99
			'1e6c6202-398e-11e8-907c-8c199a03988a' // readme.md:2
		]
	}
};
