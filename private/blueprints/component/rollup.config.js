import xRollup from '@financial-times/x-rollup';
import pkg from './package.json';

// The main entry point for the component source code
const input = 'src/{{componentName}}.jsx';

// External dependencies to exclude from the distributable bundle
const external = [];

export default xRollup({ input, pkg, external });
