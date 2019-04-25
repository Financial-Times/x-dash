const renderer = require('react-test-renderer');
const { h } = require('@financial-times/x-engine');

module.exports = ({ stories, component, presets = { default: {} } }) => {
	for (const { title, data } of stories) {
		for (const [preset, options] of Object.entries(presets)) {
			it(`renders a ${preset} ${title}`, () => {
				const props = { ...data, ...options };
				const tree = renderer.create(h(component, props)).toJSON();
				expect(tree).toMatchSnapshot();
			});
		}
	}
}
