import xRollup from '@financial-times/x-rollup';
import pkg from './package.json';

const input = 'src/Button.jsx';

export default xRollup({ input, pkg, external: ['classnames'] });
