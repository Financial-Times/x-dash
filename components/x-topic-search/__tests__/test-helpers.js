const TestUtils = require('react-dom/test-utils');

function checkArgs () {
	let target;
	let selector;

	if (arguments.length === 2) {
		target = arguments[0];
		selector = arguments[1];
	} else {
		target = document;
		selector = arguments[0];
	}
	return { target, selector };
}

function $ () {
	const { target, selector } = checkArgs(...arguments);
	return target.querySelector(selector)
}

function $$ () {
	const { target, selector } = checkArgs(...arguments);
	return Array.from(target.querySelectorAll(selector));
}

function type (target, value) {
	target.focus()

	value.split('').forEach((char) => {
		key(target, char)
		target.value += char
		// React calls oninput for every value change to maintain state at all times
		TestUtils.Simulate.input(target)
	})
}

function key (target, chars) {
	Array.from(chars).forEach((value) => {
		TestUtils.Simulate.keyDown(target, { value, key: value })
	})
}

module.exports = { $, $$, type, key };
