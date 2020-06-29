import * as utils from '../utils';

describe('getLoginPrompt', () => {
	const loginUrl = 'https://www.ft.com/login';
	const params = {
		loggedIn: {
			userId: 'fakeUserId',
			loginUrl,
		},
		loggedOutURL: {
			userId: undefined,
			loginUrl,
		},
		loggedOutURLOmitted: {
			userId: undefined,
		},
	};

	describe.each([
		[params.loggedIn],
		[
			params.loggedOutURL,
			`<p>Please <a href="${loginUrl}">sign into your account</a> before submitting your preferences to ensure these changes are applied across all of your devices</p>`,
		],
		[
			params.loggedOutURLOmitted,
			`<p>Please sign into your account before submitting your preferences to ensure these changes are applied across all of your devices</p>`,
		],
	])('utils.getLoginPrompt(%o)', (input, expected) => {
		test(`returns ${expected}`, () => {
			expect(utils.getLoginPrompt(input)).toEqual(expected);
		});
	});
});
