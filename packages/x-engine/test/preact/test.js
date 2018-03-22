const render = require('preact-render-to-string');
const { Teaser } = require('@financial-times/x-teaser');
const data = require('../teaser');

console.log(render(Teaser(data)));
