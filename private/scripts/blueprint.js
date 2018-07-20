/* eslint no-console:off */
const fs = require('fs');
const path = require('path');

function template (source, data = {}) {
	const token = /\{\{(\w+)\}\}/g;
	return source.replace(token, (match, prop) => data[prop] || '');
}

function templateFiles (target, data) {
	const list = fs.readdirSync(target);

	const output = {};

	for (const file of list) {
		const fullPath = path.join(target, file);
		const stats = fs.statSync(fullPath);

		if (stats.isFile()) {
			const source = String(fs.readFileSync(fullPath));
			// template the filename as well
			output[template(file, data)] = template(source, data);
		}
	}

	return output;
}

function writeOutput (target, output) {
	console.log(`Creating directory ${target}`);
	fs.mkdirSync(target);

	for (const [ file, content ] of Object.entries(output)) {
		console.log(`Creating file ${file}`);
		fs.writeFileSync(path.join(target, file), content);
	}
}

function error (message) {
	console.error(`ERROR: ${message}`);
	process.exit(1);
}

// Collate variables
const name = process.argv.slice(-1).pop();
const packageName = `x-${name}`;
const componentName = name.charAt(0).toUpperCase() + name.substr(1);
const source = path.join(process.cwd(), 'private/blueprints/component');
const destination = path.join(process.cwd(), 'components', packageName);

// Validate input
if (name === undefined) {
	error('A component name is required, usage: blueprint.js {name}');
}

if (/^x-/.test(name)) {
	error('Component names should not include the "x-" prefix');
}

if (fs.existsSync(destination)) {
	error(`Directory ${destination} already exists`);
}

// Create and write blueprint files
const templateData = { packageName, componentName };

writeOutput(destination, templateFiles(source, templateData));
writeOutput(path.join(destination, 'src'), templateFiles(path.join(source, 'src'), templateData));
