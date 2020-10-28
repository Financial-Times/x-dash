/* eslint no-console:off */
const fs = require('fs')
const path = require('path')

function template(source, data = {}) {
	const token = /\{\{(\w+)\}\}/g
	return source.replace(token, (match, prop) => data[prop] || '')
}

// Recursively load files from the target directory
function loadFiles(target) {
	const fileNames = fs.readdirSync(target)
	const output = {}

	for (const fileName of fileNames) {
		const fullPath = path.join(target, fileName)
		const stats = fs.statSync(fullPath)

		if (stats.isDirectory()) {
			output[fileName] = loadFiles(fullPath)
		} else {
			output[fileName] = String(fs.readFileSync(fullPath))
		}
	}

	return output
}

// Run each file through simple templating
function templateFiles(files = {}, data = {}) {
	const output = {}

	for (const [file, contents] of Object.entries(files)) {
		if (typeof contents === 'object') {
			output[file] = templateFiles(contents, data)
		} else {
			// allow file names to include placeholders
			const fileName = template(file, data)
			output[fileName] = template(contents, data)
		}
	}

	return output
}

function writeOutput(target, output) {
	const relPath = path.relative(process.cwd(), target)
	console.log(`Creating directory ${relPath}`)

	fs.mkdirSync(target)

	for (const [file, contents] of Object.entries(output)) {
		const fullPath = path.join(target, file)

		if (typeof contents === 'object') {
			writeOutput(fullPath, contents)
		} else {
			console.log(`Creating file ${file}`)

			fs.writeFileSync(fullPath, contents)
		}
	}
}

function fatal(message) {
	console.error(`ERROR: ${message}`)
	process.exit(1)
}

// Collate variables
const name = process.argv.slice(-1).pop()
const formattedName = typeof name === 'string' ? name.replace(/[^a-z]/i, '') : ''
const packageName = `x-${formattedName.toLowerCase()}`
const componentName = formattedName.charAt(0).toUpperCase() + name.substr(1)
const sourceDir = path.join(process.cwd(), 'private/blueprints/component')
const targetDir = path.join(process.cwd(), 'components', packageName)

// Validate input
if (name === undefined) {
	fatal('A component name is required, usage: blueprint.js {name}')
}

if (/^x/.test(name)) {
	fatal('Component names should not include the "x-" prefix')
}

if (fs.existsSync(targetDir)) {
	fatal(`Directory ${targetDir} already exists`)
}

// Create and write blueprint files
try {
	const files = loadFiles(sourceDir)
	const templated = templateFiles(files, { packageName, componentName })

	writeOutput(targetDir, templated)
} catch (error) {
	fatal(error.message)
}
