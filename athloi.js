const open = require('opn');
const tcpPortUsed = require('tcp-port-used');
const url = require('url');
const lernaBootstrap = require('@lerna/bootstrap');
const path = require('path');
const pascalCase = require('pascal-case');
const fs = require('fs-extra');
const bamboo = require('@quarterto/bamboo');
const rollupConfigTemplate = require('./packages/x-rollup/rollup.template');

const openUrls = {
	docs: 'http://local.ft.com:8000',
	storybook: 'http://local.ft.com:9001',
};

const defaultComponentContent = (inferredComponentName, {name, styles}) => `import h from '@financial-times/x-engine';
${styles ? `import s from './${inferredComponentName}.css';\n` : ''}
export const ${inferredComponentName} = () => <div${styles ? ' className={s.wrapper}' : ''}>Hello, ${path.basename(name)}</div>;`;

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
					{value: 'storybook', short: 'Storybook', name: 'The component explorer'},
					{value: 'docs', short: 'Docs', name: 'The documentation website'},
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
		requiredArgs: tasks.create.requiredArgs.concat(['styles']),

		choice: addPrompt(
			tasks.create.choice,
			() => prompt([{
				type: 'list',
				name: 'styles',
				message: 'Does your component require stylesheets?',
				choices: [
					{value: false, name: 'No'},
					{value: true, name: 'Yes'},
				]
			}])
		),

		async run(options) {
			const result = await tasks.create.run(options);

			// scaffold a new component with rollup config, devDeps & empty src files
			if(options.folder === 'components') {
				const newRoot = path.resolve('components', path.basename(options.name));
				const xRollupPkg = require('./packages/x-rollup/package.json');
				const xEnginePkg = require('./packages/x-engine/package.json');

				const inferredComponentName = pascalCase(
					options.name.replace(/^@financial-times\/x-/, '')
				);

				const newPkgPath = path.resolve(newRoot, 'package.json');
				const newPackageJson = await fs.readFile(newPkgPath, 'utf8');
				const newPackageData = JSON.parse(newPackageJson);

				const updatedJson = Object.assign(newPackageData, {
					main: `dist/${inferredComponentName}.cjs.js`,
					browser: `dist/${inferredComponentName}.es5.js`,
					module: `dist/${inferredComponentName}.esm.js`,
					styleMain: options.styles ? `dist/${inferredComponentName}.css` : null,

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

				await bamboo({
					'src': {
						[`${inferredComponentName}.jsx`]: defaultComponentContent(inferredComponentName, options),
						[`${inferredComponentName}.css`]: options.styles ? `.wrapper { color: blue }` : false,
					},
					'rollup.config.js': rollupConfigTemplate(inferredComponentName),
					'.gitignore': 'dist',
					'package.json': JSON.stringify(updatedJson, null, 2),
				}, {cwd: newRoot});

				await lernaBootstrap({});
			}

			return result;
		}
	})
});
