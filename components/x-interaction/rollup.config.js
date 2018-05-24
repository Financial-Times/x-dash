import xRollup from '@financial-times/x-rollup';
import pkg from './package.json';

const input = 'src/Interaction.jsx';

export default xRollup({
	input,
	pkg,
	external: [
		'@quarterto/short-id',
	]
});
