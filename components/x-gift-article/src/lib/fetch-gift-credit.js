const delay = ms => new Promise(r => setTimeout(r, ms));

export default () => {
	return delay(1000)
		.then(() => (20))
};
