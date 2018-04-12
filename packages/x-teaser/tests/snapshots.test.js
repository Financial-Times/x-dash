const { Teaser, presets } = require('../');
const renderer = require('react-test-renderer');
const { data } = require('../stories/article');
const props = { ...data, ...presets.SmallHeavy };

it('renders correctly', () => {
	const tree = renderer.create(Teaser(props)).toJSON();
	expect(tree).toMatchSnapshot();
});
