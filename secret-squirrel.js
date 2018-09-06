module.exports = {
	files: {
		allow: [
			'makefile',
			'private/logos/Logo.pxm',
			'private/scripts/gh-pages',
			'tools/x-docs/.bowerrc',
			'tools/x-docs/LICENSE',
			'tools/x-docs/public-prod/x-dash',
			'tools/x-docs/static/storybook'
		],
		allowOverrides: []
	},
	strings: {
		deny: [],
		denyOverrides: [
			'0e89d872-5711-457b-80b1-4ca0d8afea46', // __tests__/__snapshots__/snapshots.test.js.snap:571|610|1085|1124|1599|1638|2108|2147|2612|2651|3126|3165|3640|3679|4159|4198|4678|4717, components/x-teaser/stories/video.js:11
			'a27ce49b-85b8-445b-b883-db6e2f533194', // __tests__/__snapshots__/snapshots.test.js.snap:609|1123|1637|2146|2650|3164|3678|4197|4716, components/x-teaser/stories/video.js:28
			'7b55beac-38e7-11e8-9529-6286f384b7ce', // components/x-teaser/readme.md:33
			'a25832ea-0053-11e8-9650-9c0ad2d7c5b5', // components/x-teaser/stories/article.js:28, components/x-teaser/stories/top-story.js:28
			'1005ca96-364b-11e8-8b98-2f31af407cc8', // components/x-teaser/stories/opinion.js:28
			'7e97f5b6-578d-11e8-b8b2-d6ceb45fa9d0', // components/x-teaser/stories/package.js:28
			'1e6c6202-398e-11e8-907c-8c199a03988a' // readme.md:2
		]
	}
};
