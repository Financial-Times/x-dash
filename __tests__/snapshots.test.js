const renderer = require('react-test-renderer');
const fs = require('fs');
const path = require('path');

const packagesDir = path.resolve(__dirname, '../packages');

for(const pkg of fs.readdirSync(packagesDir)) {
	const pkgDir = path.resolve(packagesDir, pkg)
	const storiesDir = path.resolve(pkgDir, 'stories');

	if(fs.existsSync(storiesDir)) {
		const { name, stories, component } = require(storiesDir);
		const { presets = {default: {}} } = require(pkgDir);

		describe(name, () => {
			for (const { title, data } of stories) {
				for (const [ name, options ] of Object.entries(presets)) {
					it(`renders a ${name} ${title} teaser`, () => {
						const props = { ...data, ...options };
						const tree = renderer.create(component(props)).toJSON();
						expect(tree).toMatchSnapshot();
					});
				}
			}
		});
	}
}
