const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const name = process.argv.slice(-1).pop();

function error (message) {
	process.stderr.write(`ERROR: ${message}\n`);
	process.exit(1);
}

function log (message) {
	process.stdout.write(`${message}\n`);
}

if (name === undefined) {
	error('A component name is required, usage: blueprint.js {name}');
}

if (/^x-/.test(name)) {
	error('Component names should not include the "x-" prefix');
}

const packageName = `x-${name}`;
const componentName = name.charAt(0).toUpperCase() + name.substr(1);

const source = path.join(process.cwd(), 'private/blueprints/component');
const destination = path.join(process.cwd(), 'components', packageName);

if (fs.existsSync(destination)) {
	error(`Directory ${destination} already exists`);
}

const templateData = { packageName, componentName };

const list = fs.readdirSync(source);

// collect complete output
const output = {};

for (const file of list) {
	const buffer = fs.readFileSync(path.join(source, file));
	output[file] = ejs.render(buffer.toString(), templateData);
}

// create new component directory and output files
log(`Creating directory ${destination}`);
fs.mkdirSync(destination);

for (const [ file, content ] of Object.entries(output)) {
	log(`Creating file ${file}`);
	fs.writeFileSync(path.join(destination, file), content);
}
