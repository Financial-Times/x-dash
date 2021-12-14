const React = require('react')

// eslint-disable-next-line no-unused-vars
const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')

import { PrivacyManager } from '../privacy-manager'

export const CONSENT_PROXY_HOST = 'https://consent.ft.com'
export const CONSENT_PROXY_ENDPOINT = 'https://consent.ft.com/__consent/consent-record/FTPINK/abcde'

/**
 *
 * @param {{
 *   setConsentCookie: boolean,
 *   consent: boolean
 * }}
 * @returns
 */
export const buildPayload = ({ setConsentCookie, consent }) => {
	return {
		setConsentCookie,
		consentSource: 'consuming-app',
		data: {
			behaviouralAds: {
				onsite: {
					fow: 'privacyCCPA/H0IeyQBalorD.6nTqqzhNTKECSgOPJCG',
					lbi: true,
					source: 'consuming-app',
					status: consent
				}
			},
			demographicAds: {
				onsite: {
					fow: 'privacyCCPA/H0IeyQBalorD.6nTqqzhNTKECSgOPJCG',
					lbi: true,
					source: 'consuming-app',
					status: consent
				}
			},
			programmaticAds: {
				onsite: {
					fow: 'privacyCCPA/H0IeyQBalorD.6nTqqzhNTKECSgOPJCG',
					lbi: true,
					source: 'consuming-app',
					status: consent
				}
			}
		},
		cookieDomain: '.ft.com',
		formOfWordsId: 'privacyCCPA'
	}
}

/** @type {XPrivacyManager.BasePrivacyManagerProps} */
export const defaultProps = {
	userId: 'abcde',
	legislationId: 'ccpa',
	consentSource: 'consuming-app',
	consentProxyApiHost: CONSENT_PROXY_HOST,
	cookieDomain: '.ft.com',
	fow: {
		id: 'privacyCCPA',
		version: 'H0IeyQBalorD.6nTqqzhNTKECSgOPJCG'
	},
	actions: {
		onConsentChange: jest.fn(() => {}),
		sendConsent: jest.fn().mockReturnValue({ _response: { ok: undefined } })
	},
	onConsentSavedCallbacks: [jest.fn(), jest.fn()]
}

/**
 * Configure an instance of PrivacyManager and set up
 * - Handlers for submit events
 * - Post-submission callbacks
 *
 * @param {Partial<XPrivacyManager.BasePrivacyManagerProps>} propOverrides
 *
 * @returns {{
 *   subject: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
 *   callbacks: XPrivacyManager.OnSaveCallback[] | jest.Mock<any, any>[];
 *   submitConsent(value: boolean): Promise<void>;
 * }}
 */
export function setupPrivacyManager(propOverrides = {}) {
	const props = Object.assign({}, defaultProps, propOverrides)
	const subject = mount(<PrivacyManager {...props} />)

	return {
		subject,
		callbacks: props.onConsentSavedCallbacks,
		async submitConsent(value) {
			await subject.find(`input[value="${value}"]`).first().prop('onChange')(undefined)
			await subject.find('form').first().prop('onSubmit')(undefined)

			// Reconcile snapshot with state
			subject.update()
		}
	}
}
