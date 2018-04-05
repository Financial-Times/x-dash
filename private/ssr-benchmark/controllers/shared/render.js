const h = require('@financial-times/x-engine');
const { Teaser } = require('@financial-times/x-teaser');
const list = require('../../mocks/list');

module.exports = () => h('div', null, list.map((item) => Teaser(item)));
