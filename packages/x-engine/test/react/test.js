const { renderToString } = require('react-dom/server');
const { Teaser } = require('../../../x-teaser');
const data = require('../teaser');

console.log(renderToString(Teaser(data)));
