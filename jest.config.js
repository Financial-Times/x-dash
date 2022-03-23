module.exports = {
	testURL: 'https://local.ft.com/',
	testMatch: ['**/__tests__/**/*.test.js?(x)'],
	testPathIgnorePatterns: ['/node_modules/'],
	transform: {
		'^.+\\.jsx?$': './packages/x-babel-config/jest'
	},
	moduleNameMapper: {
		'^[./a-zA-Z0-9$_-]+\\.scss$': '<rootDir>/__mocks__/styleMock.js'
	},
	modulePathIgnorePatterns: ['<rootDir>/e2e/']
}
