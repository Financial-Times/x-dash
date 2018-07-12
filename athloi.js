const open = require('opn');
const tcpPortUsed = require('tcp-port-used');
const url = require('url');
const lernaBootstrap = require('@lerna/bootstrap');
const path = require('path');
const pascalCase = require('pascal-case');
const fs = require('fs-extra');
const bamboo = require('@quarterto/bamboo');
const rollupConfigTemplate = require('./packages/x-rollup/rollup.template');
const dotgit = require('dotgitignore')();
const mergeDeep = require('merge-deep');
const chalk = require('chalk');
const sentence = require('athloi/src/sentence');
const inquirer = require('inquirer');

const openUrls = {
	docs: 'http://local.ft.com:8000',
	storybook: 'http://local.ft.com:9001',
};

async function filterPromise(array, fn) {
	const filtered = new Array(array.length);

	await Promise.all(
		array.map(
			(item, index) => Promise.resolve(
				fn(item, index, array)
			).then(
				include => {
					if(include) {
						filtered[index] = item;
					}
				}
			)
		)
	);

	return filtered.filter(Boolean);
}

const defaultComponentContent = (inferredComponentName, {name, styles}) => `import h from '@financial-times/x-engine';
${styles ? `import s from './${inferredComponentName}.css';\n` : ''}
export const ${inferredComponentName} = () => <div${styles ? ' className={s.wrapper}' : ''}>Hello, ${path.basename(name)}</div>;`;

const defaultStoryIndex = inferredComponentName => `const { ${inferredComponentName} } = require('../');

exports.component = ${inferredComponentName};
exports.package = require('../package.json');
exports.knobs = require('./knobs.js');

exports.stories = [
	require('./story-one.js'),
	// for additional use cases create new story files and require them here
];

exports.dependencies = {
// 'o-typography': '^5.3.0', // add any Origami module dependencies to load from the Build Service here
};`;

const defaultStoryOne = `exports.title = 'Story One';
exports.data = {};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;`;

const defaultKnobs = `module.exports = (data, knobTypes) => ({
// add any configurable properties here. \`knobTypes\` contains
// all available knobs https://github.com/storybooks/storybook/tree/master/addons/knobs#available-knobs
// property() {
// 	return knobTypes.string('Property', data.property)
// }
});`;

const modifyPackageJson = async (root, newData) => JSON.stringify(
	mergeDeep(
		JSON.parse(
			await fs.readFile(path.resolve(root, 'package.json'), 'utf8')
		),
		newData
	),
	null, 2
);

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
			const port = parseInt(url.parse(openUrls.storybook).port, 10);
			if(await tcpPortUsed.check(port)) {
				console.log(chalk.red.bold.underline('Storybook running'));
				console.log(`it looks like Storybook is running. creating a new package at this point will crash Storybook and there's nothing i can do about that.`);

				const {cont} = await inquirer.prompt({
					type: 'confirm',
					name: 'cont',
					message: `i've stopped Storybook, continue creating the component`,
					default: false,
				});

				if(!cont) {
					process.exit(0);
					return;
				}
			}

			const result = await tasks.create.run(options);

			// scaffold a new component with rollup config, devDeps & empty src files
			if(options.folder === 'components') {

				const newRoot = path.resolve('components', path.basename(options.name));
				const xRollupPkg = require('./packages/x-rollup/package.json');
				const xEnginePkg = require('./packages/x-engine/package.json');

				const inferredComponentName = pascalCase(
					options.name.replace(/^@financial-times\/x-/, '')
				);

				const updatedComponentJson = await modifyPackageJson(newRoot, {
					main: `dist/${inferredComponentName}.cjs.js`,
					browser: `dist/${inferredComponentName}.es5.js`,
					module: `dist/${inferredComponentName}.esm.js`,
					style: options.styles ? `dist/${inferredComponentName}.css` : null,

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
					'stories': {
						'story-one.js': defaultStoryOne,
						'index.js': defaultStoryIndex(inferredComponentName),
						'knobs.js': defaultKnobs
					},
					'rollup.config.js': rollupConfigTemplate(inferredComponentName),
					'.gitignore': 'dist',
					'package.json': updatedComponentJson,
				}, {cwd: newRoot});

				const updatedWorkbenchJson = await modifyPackageJson('tools/x-workbench', {
					dependencies: {
						[options.name]: '^' + JSON.parse(updatedComponentJson).version
					},
				});

				const registerComponents = await fs.readFile('tools/x-workbench/register-components.js', 'utf8');

				await bamboo({
					'register-components.js': registerComponents.replace(
						'];',
						`	require('${options.name}/stories'),
];`
					),
					'package.json': updatedWorkbenchJson,
				}, {cwd: 'tools/x-workbench'});

				await lernaBootstrap({});
			}

			return result;
		}
	}),

	cleanup: {
		label: 'Clean up old package folders',

		async run({packages, logger}) {
			logger.start('looking for old packages (with nothing but gitignored files in them)');
			const isGitIgnored = file => dotgit.ignore(file);

			async function packageIsOld(pkg) {
				const files = await fs.readdir(pkg);

				return files
					.map(file => path.join(pkg, file))
					.every(isGitIgnored);
			}

			const oldPackages = await filterPromise(packages, packageIsOld);
			const packageNames = sentence(oldPackages.map(name => path.basename(name)));

			if(oldPackages.length === 0) {
				return logger.success('no old packages found');
			}

			logger.packages(`${packageNames} appear to be old.`);

			const {everything} = await inquirer.prompt({
				type: 'list',
				name: 'everything',
				message: `Remove all these packages?`,
				choices: [
					{value: true, name: 'Yes'},
					{value: false, name: 'No'},
				]
			});

			const toDelete = everything
				? oldPackages
				: (await inquirer.prompt({
					type: 'checkbox',
					name: 'toDelete',
					message: `Select packages to delete:`,
					choices: oldPackages.map(name => ({
						name: path.basename(name),
						value: name,
					}))
				})).toDelete;

			await Promise.all(
				toDelete.map(
					pkg => fs.remove(pkg).then(
						() => logger.message(chalk.grey(`deleted ${chalk.cyan(pkg)}`))
					)
				)
			);

			logger.success('finished cleanup');
		}
	}
});
