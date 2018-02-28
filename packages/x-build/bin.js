#!/usr/bin/env node

process.argv.splice(
	2, 0,
	'--preset=@financial-times/x-build/babel'
);

require('@babel/cli/bin/babel');
