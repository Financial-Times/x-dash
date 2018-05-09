const open = require('opn');
const tcpPortUsed = require('tcp-port-used');
const url = require('url');
const lernaBootstrap = require('@lerna/bootstrap');
const path = require('path');
const titleCase = require('title-case');
const fs = require('fs-extra');
const rollupConfigTemplate = require('./packages/x-rollup/rollup.template');

const openUrls = {
	docs: 'http://localhost:8000',
	storybook: 'http://localhost:9001',
};

module.exports = ({tasks, prompt, addPrompt}) => ({
	start: Object.assign({}, tasks.start, {
		requiredArgs: ['open'],

		choice: addPrompt(
			tasks.start.choice,
			() => prompt([{
				type: 'list',
				name: 'open',
				message: 'What do you want to open in the browser?',
				choices: [
					{value: 'docs', short: 'Docs', name: 'The documentation website'},
					{value: 'storybook', short: 'Storybook', name: 'The component explorer'},
				]
			}])
		),

		run(options) {
			const openUrl = openUrls[options.open];
			const port = parseInt(url.parse(openUrl).port, 10);

			if(port) {
				// wait for whatever (storybook/gatsby) to be listening on the port
				// try every 500ms and give up after 30s
				tcpPortUsed.waitUntilUsed(port, 500, 30000)
					.then(() => open(openUrl))
					.catch(e => console.error(e.stack));
			}

			return tasks.start.run(options);
		},
	}),

	create: Object.assign({}, tasks.create, {
		async run(options) {
			const result = await tasks.create.run(options);

			// scaffold a new component with rollup config, devDeps & empty src files
			if(options.folder === 'components') {
				const newRoot = path.resolve('components', path.basename(options.name));
				const xRollupPkg = require('./packages/x-rollup/package.json');
				const xEnginePkg = require('./packages/x-engine/package.json');

				const inferredComponentName = titleCase(
					options.name.replace(/^@financial-times\/x-/, '')
				);

				const newPkgPath = path.resolve(newRoot, 'package.json');
				const newPackageJson = await fs.readFile(newPkgPath, 'utf8');
				const newPackageData = JSON.parse(newPackageJson);

				const updatedJson = Object.assign(newPackageData, {
					main: `dist/${inferredComponentName}.cjs.js`,
					browser: `dist/${inferredComponentName}.es5.js`,
					module: `dist/${inferredComponentName}.esm.js`,

					scripts: {
						prepare: 'npm run build',
						build: 'rollup -c rollup.config.js',
						start: 'rollup --watch -c rollup.config.js',
					},

					devDependencies: {
						'@financial-times/x-engine': '^' + xEnginePkg.version,
						'@financial-times/x-rollup': '^' + xRollupPkg.version,
						'rollup': xRollupPkg.peerDependencies['rollup'],
					},

					peerDependencies: {
						'@financial-times/x-engine': '^' + xEnginePkg.version,
					},
				});

				await fs.ensureDir(path.resolve(newRoot, 'src'));

				await Promise.all([
					fs.writeFile(
						path.resolve(newRoot, 'src', `${inferredComponentName}.jsx`), ''
					),
					fs.writeFile(
						path.resolve(newRoot, 'rollup.config.js'),
						rollupConfigTemplate(inferredComponentName)
					),
					fs.writeFile(
						path.resolve(newRoot, '.gitignore'),
						'dist'
					),
					fs.writeFile(
						newPkgPath,
						JSON.stringify(updatedJson, null, 2)
					),
				]);

				await lernaBootstrap({});
			}

			return result;
		}
	})
});
