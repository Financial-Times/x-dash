const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

function templateFiles (target, data) {
	const list = fs.readdirSync(target);

	const output = {};

	for (const file of list) {
		const fullPath = path.join(target, file);
		const stats = fs.statSync(fullPath);

		if (stats.isFile()) {
			const buffer = fs.readFileSync(fullPath);
			output[file] = ejs.render(buffer.toString(), data);
		}
	}

	return output;
}

function writeOutput (target, output) {
	log(`Creating directory ${target}`);
	fs.mkdirSync(target);

	for (const [ file, content ] of Object.entries(output)) {
		log(`Creating file ${file}`);
		fs.writeFileSync(path.join(target, file), content);
	}
}

function error (message) {
	process.stderr.write(`ERROR: ${message}\n`);
	process.exit(1);
}

function log (message) {
	process.stdout.write(`${message}\n`);
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

// The name of the component entry file should match the component name
const entry = templateFiles(path.join(source, 'src'), templateData);

writeOutput(path.join(destination, 'src'), {
	[`${componentName}.js`]: entry['Component.js']
});
