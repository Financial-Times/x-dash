module.exports = (moduleId, cwd) => require.resolve(moduleId, {
	paths: [cwd || process.cwd()]
});
