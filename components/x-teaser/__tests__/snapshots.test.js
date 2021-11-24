const { h } = require('@financial-times/x-engine')
const renderer = require('react-test-renderer')
const { Teaser, presets } = require('../')

const storyData = {
	article: require('../__fixtures__/article.json'),
	'article-with-data-image': require('../__fixtures__/article-with-data-image.json'),
	'article-with-missing-image-url': require('../__fixtures__/article-with-missing-image-url.json'),
	opinion: require('../__fixtures__/opinion.json'),
	contentPackage: require('../__fixtures__/content-package.json'),
	packageItem: require('../__fixtures__/package-item.json'),
	podcast: require('../__fixtures__/podcast.json'),
	video: require('../__fixtures__/video.json'),
	promoted: require('../__fixtures__/promoted.json'),
	topStory: require('../__fixtures__/top-story.json')
}

describe('x-teaser / snapshots', () => {
	Object.entries(storyData).forEach(([type, data]) => {
		Object.entries(presets).forEach(([name, settings]) => {
			it(`renders a ${name} teaser with ${type} data`, () => {
				const props = { ...data, ...settings }
				const tree = renderer.create(h(Teaser, props)).toJSON()

				expect(tree).toMatchSnapshot()
			})
		})
	})
})
