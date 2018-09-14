const getBabelConfig = require('./');
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer(getBabelConfig());
