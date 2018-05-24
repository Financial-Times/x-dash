module.exports = name => `import xRollup from '@financial-times/x-rollup';
import pkg from './package.json';

const input = 'src/${name}.jsx';

export default xRollup({input, pkg});
`;
