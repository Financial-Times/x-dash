import { h } from '@financial-times/x-engine'

import { renderLoggedOutWarning, renderMessage } from './components/messages'
import { Form } from './components/form'
import { RadioBtn } from './components/radio-btn'
import { withCustomActions } from './actions'
import * as utils from './utils'
import s from './privacy-manager.scss'

const defaultButtonText = {
	allow: { label: 'Allow', text: 'See personalised adverts' },
	block: { label: 'Block', text: 'Opt out of personalised adverts' },
	submit: { label: 'Save' }
}

/**
 * @param {import('../types').BasePrivacyManagerProps} Props
 */
export function BasePrivacyManager({
	userId,
	referrer,
	legislationId,
	cookieDomain,
	fow,
	consent,
	consentSource,
	consentProxyApiHost,
	buttonText = {},
	onConsentSavedCallbacks = [],
	actions,
	isLoading,
	children,
	_response = undefined
}) {
	// Shallowly merge supplied button labels with defaults
	buttonText = { ...defaultButtonText, ...buttonText }

	const consentProxyEndpoints = utils.getConsentProxyEndpoints({
		userId,
		consentProxyApiHost,
		cookieDomain
	})
	const consentApiUrl = consentProxyEndpoints.createOrUpdateRecord
	const trackingKeys = utils.getTrackingKeys(legislationId)
	const { sendConsent, onConsentChange } = actions

	const radioBtnProps = (type, checked) => ({
		name: 'consent',
		type,
		checked,
		trackingKeys,
		buttonText,
		onChange: onConsentChange
	})

	/** @type {import('../types').FormProps} */
	const formProps = {
		consent,
		consentApiUrl,
		trackingKeys,
		buttonText,
		sendConsent: () => {
			return sendConsent({
				consentApiUrl,
				onConsentSavedCallbacks,
				consentSource,
				cookieDomain,
				fow
			})
		}
	}

	return (
		<div className={s.consent} data-component="x-privacy-manager">
			{children}
			{renderLoggedOutWarning(userId)}
			<div className={s.messages} aria-live="polite">
				{renderMessage(isLoading, _response, referrer)}
			</div>
			<Form {...formProps}>
				<RadioBtn {...radioBtnProps('allow', consent === true)} />
				<RadioBtn {...radioBtnProps('block', consent === false)} type="block" checked={consent === false} />
			</Form>
		</div>
	)
}

export const PrivacyManager = withCustomActions(BasePrivacyManager)
