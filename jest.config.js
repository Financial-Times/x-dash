module.exports = {
	testURL: 'https://local.ft.com/',
	testMatch: ['**/__tests__/**/*.test.js'],
	testPathIgnorePatterns: ['/node_modules/', '/bower_components/'],
	transform: {
		'^.+\\.jsx?$': './babel-jest.js',
	},
};
