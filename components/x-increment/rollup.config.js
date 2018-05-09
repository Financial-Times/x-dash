import xRollup from '@financial-times/x-rollup';
import pkg from './package.json';

const input = 'src/Increment.jsx';

export default xRollup({input, pkg});
