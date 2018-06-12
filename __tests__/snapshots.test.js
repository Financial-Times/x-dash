const renderer = require('react-test-renderer');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const {packages} = require('../lerna.json');

const packagesGlob = packages.length > 1
	? `{${packages.join(',')}}`
	: packages[0];

const packageDirs = glob.sync(packagesGlob);

for(const pkg of packageDirs) {
	const pkgDir = path.resolve(pkg);
	const storiesDir = path.resolve(pkgDir, 'stories');

	if(fs.existsSync(storiesDir)) {
		const { package: pkg, stories, component } = require(storiesDir);
		const { presets = {default: {}} } = require(pkgDir);
		const name = path.basename(pkg.name);

		describe(pkg.name, () => {
			for (const { title, data } of stories) {
				for (const [ preset, options ] of Object.entries(presets)) {
					it(`renders a ${preset} ${title} ${name}`, () => {
						const props = { ...data, ...options };
						const tree = renderer.create(component(props)).toJSON();
						expect(tree).toMatchSnapshot();
					});
				}
			}
		});
	}
}
