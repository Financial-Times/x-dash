const engines = new Set([ 'react', 'preact', 'vhtml' ]);

export default (runtime: string): Function => {
	const engine = engines.has(runtime) ? require('./engines/' + runtime) : null;

	if (engine) {
		return engine;
	} else {
		throw new Error(`"${runtime}" is not a valid runtime engine`);
	}
};
