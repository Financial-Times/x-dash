const { renderToString } = require('react-dom/server');
const { Teaser } = require('@financial-times/x-teaser');
const data = require('../teaser');

console.log(renderToString(Teaser(data)));
