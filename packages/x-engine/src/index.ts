import { SFC, Attributes, ReactNode, ReactElement } from 'react';
import { join } from 'path';
import { readFileSync } from 'fs';
import deepGet from './concerns/deep-get';

// All components can extend a generic functional component without explicitly
// importing any React typings.
export type Component<P> = SFC<P>;

// Any engine we load should expose have a generic factory interface
export type Factory = <P>(
	type: Component<P> | string,
	props?: Attributes & P | null,
	...children: ReactNode[]
) => ReactElement<P> | string;

const manifest = join(process.cwd(), 'package.json');

const pkg = JSON.parse(readFileSync(manifest).toString());

const runtime = deepGet(pkg, 'x-dash.engine.server');

if (typeof runtime !== 'string') {
	throw new Error('x-engine requires a server runtime engine to be specified');
}

let engine;

try {
	engine = require('./engines/' + runtime) as Factory;
} catch (error) {
	// TODO: A friendlier error message
	throw new Error(`Failed to load "${runtime}"`);
}

export const h = engine;
