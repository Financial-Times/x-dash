#!/usr/bin/env node

process.argv.splice(
	2, 0,
	'--presets=@financial-times/x-build/babel'
);

require('@babel/cli/bin/babel');
