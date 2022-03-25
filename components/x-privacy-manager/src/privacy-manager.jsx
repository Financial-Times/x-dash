import { h } from '@financial-times/x-engine'

import { renderLoggedOutWarning, renderMessage } from './components/messages'
import { Form } from './components/form'
import { RadioBtn } from './components/radio-btn'
import { withCustomActions } from './actions'
import * as utils from './utils'

const defaultButtonText = {
	allow: { label: 'Allow', text: 'See personalised adverts' },
	block: { label: 'Block', text: 'Opt out of personalised adverts' },
	submit: { label: 'Save' }
}

/**
 * @param {XPrivacyManager.BasePrivacyManagerProps} Props
 */
export function BasePrivacyManager({
	userId,
	redirectUrl,
	legislationId,
	cookiesOnly,
	cookieDomain,
	fow,
	consent,
	consentSource,
	consentProxyApiHost,
	onConsentSavedCallbacks = [],
	buttonText = {},
	loginUrl,
	actions,
	isLoading,
	_response = undefined
}) {
	// Shallowly merge supplied button labels with defaults
	buttonText = { ...defaultButtonText, ...buttonText }

	const consentProxyEndpoints = utils.getConsentProxyEndpoints({
		userId,
		consentProxyApiHost,
		cookiesOnly,
		cookieDomain
	})
	const consentApiUrl = consentProxyEndpoints.createOrUpdateRecord
	const trackingKeys = utils.getTrackingKeys(legislationId)
	const { sendConsent, onConsentChange } = actions

	/**
	 * @param {"allow"|"block"} type
	 * @param {boolean} checked
	 */
	const radioBtnProps = (type, checked) => ({
		name: 'consent',
		type,
		checked,
		trackingKeys,
		buttonText,
		onChange: onConsentChange
	})

	/** @type {XPrivacyManager.FormProps} */
	const formProps = {
		consent,
		consentApiUrl,
		trackingKeys,
		buttonText,
		sendConsent: () => {
			return sendConsent({
				setConsentCookie: legislationId === 'gdpr',
				consentApiUrl,
				onConsentSavedCallbacks,
				consentSource,
				cookieDomain,
				fow
			})
		}
	}

	return (
		<div className="x-privacy-manager" data-component="x-privacy-manager">
			{renderLoggedOutWarning(userId, loginUrl)}
			<Form {...formProps}>
				<RadioBtn {...radioBtnProps('allow', consent === true)} />
				<RadioBtn {...radioBtnProps('block', consent === false)} type="block" checked={consent === false} />
			</Form>
			<div className="x-privacy-manager__messages" aria-live="polite">
				{renderMessage(isLoading, _response, redirectUrl)}
			</div>
		</div>
	)
}

export const PrivacyManager = withCustomActions(BasePrivacyManager)
