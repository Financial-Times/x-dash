import { SFC, Attributes, ReactNode, ReactElement } from 'react';
import { join } from 'path';
import deepGet from './concerns/deep-get';
import readJSON from './concerns/read-json';

const pkg = readJSON(join(process.cwd(), 'package.json'));

const runtime = deepGet(pkg, 'x-dash.engine.server');

if (runtime === undefined) {
	throw new Error('x-engine requires a server runtime engine to be specified');
}

// Force the engine we load dynamically to have a generic, dom-builder interface
export type Factory = <P>(
	type: SFC<P> | string,
	props?: Attributes & P | null,
	...children: ReactNode[]
) => ReactElement<P>;

let engine;

try {
	engine = require('./engines/' + runtime) as Factory;
} catch (error) {
	// TODO: A friendlier error message
	throw new Error(`Failed to load "${runtime}"`);
}

export const h = engine;

export type Component = SFC;
