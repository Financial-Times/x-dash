import { h } from '@financial-times/x-engine';

const delay = ms => new Promise(r => setTimeout(r, ms));

export default () => {
	return delay(2000)
		.then(() => ('https://gift-url'))
};
