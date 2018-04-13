const { Teaser, presets } = require('../');
const renderer = require('react-test-renderer');

const stories = {
	article: require('../stories/article').data,
	opinion: require('../stories/opinion').data,
	promoted: require('../stories/promoted').data,
	'top-story': require('../stories/top-story').data,
	video: require('../stories/video').data
};

describe('x-teaser', () => {
	for (const [ type, data ] of Object.entries(stories)) {
		for (const [ name, options ] of Object.entries(presets)) {
			it(`renders a ${name} ${type} teaser`, () => {
				const props = { ...data, ...options };
				const tree = renderer.create(Teaser(props)).toJSON();
				expect(tree).toMatchSnapshot();
			});
		}
	}
});
