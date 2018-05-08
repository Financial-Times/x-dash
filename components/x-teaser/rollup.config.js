import xRollup from '@financial-times/x-rollup';
import pkg from './package.json';

const input = 'src/Teaser.jsx';

const external = [
	'dateformat'
];

export default xRollup({input, pkg, external});
