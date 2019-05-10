const getBabelConfig = require('./');
const babelJest = require('babel-jest');

const base = getBabelConfig([{ node: 6 }], 'commonjs');

module.exports = babelJest.createTransformer(base);
