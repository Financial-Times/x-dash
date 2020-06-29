import * as utils from '../utils';

import { hasRequiredFTConsent, getConsentProxyEndpoints } from '../utils';

const valuesCCPA = {
	onAll: ['behaviouraladsOnsite:on', 'demographicadsOnsite:on', 'programmaticadsOnsite:on'],
	offOne: ['behaviouraladsOnsite:on', 'demographicadsOnsite:on', 'programmaticadsOnsite:off'],
	offAll: ['behaviouraladsOnsite:off', 'demographicadsOnsite:off', 'programmaticadsOnsite:off'],
};

const valuesOther = `
cookiesOnsite:on,
cookiesUseraccept:off,
enhancementByemail:on,
enhancementByfax:off,
enhancementByphonecall:off,
enhancementBypost:off,
enhancementBysms:off,
marketingByemail:on,
marketingByfax:off,
marketingByphonecall:on,
marketingBypost:on,
marketingBysms:off,
membergetmemberByemail:off,
recommendedcontentOnsite:on"
`;

const consentProxyApiHost = 'https://consent.ft.com';
const anonEndpoint = 'https://consent.ft.com/__consent/consent-record-cookie';
const anonEndpoints = {
	core: anonEndpoint,
	enhanced: anonEndpoint,
	createOrUpdateRecord: anonEndpoint,
};

describe('utils', () => {
	describe('isOptedIn', () => {
		describe.each([
			[valuesCCPA.onAll, true],
			[valuesCCPA.offOne, false],
			[valuesCCPA.offAll, false],
		])('isOptedIn(%s)', (input, expected) => {
			test(`returns ${expected}`, () => {
				const cookieStr = `${input.join(',')},${valuesOther}`;
				const cookieVal = encodeURIComponent(cookieStr);
				expect(hasRequiredFTConsent(cookieVal)).toBe(expected);
			});
		});
	});

	describe('getConsentProxyEndpoints', () => {
		describe.each([
			[
				{ userId: 'userId', consentProxyApiHost },
				{
					core: 'https://consent.ft.com/__consent/consent-record/FTPINK/userId',
					enhanced: 'https://consent.ft.com/__consent/consent/FTPINK/userId',
					createOrUpdateRecord: 'https://consent.ft.com/__consent/consent-record/FTPINK/userId',
				},
			],
			[{ userId: undefined, consentProxyApiHost }, anonEndpoints],
			[{ userId: 'userId', cookiesOnly: true, consentProxyApiHost }, anonEndpoints],
		])(`getConsentProxyEndpoints(%o)`, (input, expected) => {
			test(`returns ${JSON.stringify(expected, null, 2)}`, () => {
				expect(getConsentProxyEndpoints(input)).toEqual(expected);
			});
		});
	});

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
});
