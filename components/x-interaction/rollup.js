const xRollup = require('@financial-times/x-rollup');
const pkg = require('./package.json');

xRollup({ input: require.resolve('./src/Interaction.jsx'), pkg });
