import { h } from '@financial-times/x-engine';

const delay = ms => new Promise(r => setTimeout(r, ms));

export default () => {
	return delay(1000)
		.then(() => {
			return 'https://gift-url';
		})
};
