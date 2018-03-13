const engines = new Map();

engines.set('react', (): Function => {
	const { createElement } = require('react');
	return createElement;
});

engines.set('preact', (): Function => {
	const { createElement } = require('preact');
	return createElement;
});

engines.set('vhtml', (): Function => {
	return require('vhtml');
});

export default (engine: string): Function => {
	if (engines.has(engine)) {
		return engines.get(engine)();
	} else {
		const available = Array.from(engines.keys()).join(', ');
		throw new Error(`"${engine}" is not a valid engine, available engines are: ${available}`);
	}
};
