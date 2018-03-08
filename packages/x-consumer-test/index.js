const renderToString = require('preact-render-to-string');
const {h} = require('preact');
const Testbed = require('@financial-times/x-testbed');

console.log(renderToString(
	h(Testbed, {foo: 'hello '})
));
