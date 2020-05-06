const xRollup = require('@financial-times/x-rollup');
const pkg = require('./package.json');

xRollup({ input: './src/ContentBlock.jsx', pkg });
