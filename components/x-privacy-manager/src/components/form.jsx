import { h } from '@financial-times/x-engine'
import s from '../privacy-manager.scss'

/**
 * @param {import("../../types").FormProps} args
 */
export const Form = ({ consent, consentApiUrl, sendConsent, trackingKeys, buttonText, children }) => {
	/** @type {import('../../types').TrackingKey} */
	const consentAction = consent ? 'consent-allow' : 'consent-block'
	const btnTrackingId = trackingKeys[consentAction]
	const isDisabled = typeof consent === 'undefined'

	/** @param {React.FormEvent} event  */
	const onSubmit = (event) => {
		event && event.preventDefault()
		return sendConsent()
	}

	return (
		<form action={consentApiUrl} onSubmit={onSubmit}>
			<div className={s.form__controls}>{children}</div>
			<button className={s.form__submit} type="submit" data-trackable={btnTrackingId} disabled={isDisabled}>
				{buttonText.submit.label}
			</button>
		</form>
	)
}
