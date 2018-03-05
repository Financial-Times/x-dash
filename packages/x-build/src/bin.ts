#!/usr/bin/env node

import * as Path from 'path';
import { CLI, Shim } from 'clime';

let shim = new Shim(
	new CLI('x-build', Path.join(__dirname, 'commands'))
);

shim.execute(process.argv);
