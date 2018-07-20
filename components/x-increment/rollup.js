const xRollup = require('@financial-times/x-rollup');
const pkg = require('./package.json');

xRollup({ input: require.resolve('./src/Increment.jsx'), pkg });
