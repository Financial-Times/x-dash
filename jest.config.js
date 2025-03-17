module.exports = {
	testURL: 'https://local.ft.com/',
	testMatch: ['**/__tests__/**/*.test.js?(x)'],
	testPathIgnorePatterns: ['/node_modules/'],
	transform: {
		'^.+\\.jsx?$': './packages/x-babel-config/jest'
	},
	moduleNameMapper: {
		'^[./a-zA-Z0-9$_-]+\\.scss$': '<rootDir>/__mocks__/styleMock.js',
		'@financial-times/o-share': '<rootDir>/node_modules/@financial-times/o-share/main.js'
	},
	modulePathIgnorePatterns: ['<rootDir>/e2e/'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}
