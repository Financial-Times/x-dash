module.exports = {
	testMatch: ['<rootDir>/e2e.test.js'],
	testPathIgnorePatterns: ['/node_modules/'],
	transform: {
		'^.+\\.jsx?$': '../packages/x-babel-config/jest'
	},
	moduleNameMapper: {
		'^[./a-zA-Z0-9$_-]+\\.scss$': '<rootDir>/__mocks__/styleMock.js'
	},
	testEnvironment: 'node'
}
