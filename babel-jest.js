const getBabelConfig = require('./packages/x-rollup/src/babel-config/base');
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer(getBabelConfig());
