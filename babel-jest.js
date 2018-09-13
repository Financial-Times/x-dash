const getBabelConfig = require('./packages/x-rollup/src/babel-config');
const babelJest = require('babel-jest');

const config = getBabelConfig([], false);

delete config.include;

module.exports = babelJest.createTransformer(config);
