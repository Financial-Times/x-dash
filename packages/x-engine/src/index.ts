import { join } from 'path';
import deepGet from './concerns/deep-get';
import readJSON from './concerns/read-json';
import engines from './engines';

const pkg = readJSON(join(process.cwd(), 'package.json'));

const runtime = deepGet(pkg, 'x-dash.engine.server');

if (runtime === undefined) {
	throw new Error('x-engine requires a server runtime engine to be specified');
}

export default engines(runtime);
