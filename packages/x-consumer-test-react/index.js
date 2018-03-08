const {renderToString} = require('react-dom/server');
const {createElement: h} = require('react');
const Testbed = require('@financial-times/x-testbed');

console.log(renderToString(
	h(Testbed, {foo: 'hello'})
));
