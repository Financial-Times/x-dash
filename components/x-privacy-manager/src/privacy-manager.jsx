/**
 * @typedef {{ ok: boolean, status?: number }} _Response
 */

import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';

import s from './privacy-manager.scss';
import { RadioBtn } from './radio-btn';
import { LoadingMessage, ResponseMessage } from './messages';

// TODO: Replace with the genuine endpoint
export const CONSENT_API = 'https://consent.ft.com';

export const withCustomActions = withActions(() => ({
	onConsentChange() {
		return ({ consent = true }) => ({ consent: !consent });
	},

	sendConsent() {
		return async ({ isLoading, consent }) => {
			console.log('sendConsent', { isLoading, consent });

			if (isLoading) return;

			const body = JSON.stringify({
				demographic: consent,
				behavioural: consent,
				programmatic: consent
			});

			try {
				const res = await fetch(CONSENT_API, { method: 'PATCH', body });
				return { _response: { ok: res.ok } };
			} catch (err) {
				return { _response: { ok: false } };
			}
		};
	}
}));

/**
 * @param {boolean} isLoading
 * @param {_Response} response
 * @param {string} referrer
 */
function renderMessage(isLoading, response, referrer) {
	if (isLoading) return <LoadingMessage />;
	if (response) return <ResponseMessage success={response.ok} referrer={referrer} />;
	return null;
}

/**
 * @param {{
 *   consent?: boolean
 *   referrer?: string
 *   legislation?: string[]
 *   actions: {
 *     onConsentChange: () => void
 * 	   sendConsent: () => Promise<{_response: _Response }>
 *   },
 *   isLoading: boolean
 *   _response?: _Response
 * }} Props
 */
export function BasePrivacyManager({
	consent = true,
	referrer,
	actions,
	isLoading,
	_response = undefined
}) {
	return (
		<div className={s.consent}>
			<h1 className={s.consent__title}>Do Not Sell My Personal Information</h1>
			<div className={s.consent__copy}>
				<p>
					CCPA defines the "sale" of personal information in extremely broad terms. For this reason,
					the collection of data by advertisers who advertise on our Sites for the purposes of
					measuring the effectiveness of their advertising is caught, and requires the ability to
					object to the use of your personal information. The data collected by advertisers may
					include online identifiers, such as IP address, and interactions with advertisements.
				</p>
				<p>
					Our advertising Terms and Conditions limit the use of this data by advertisers only to
					their own business purposes, including analytics and attribution, not for commercial
					purposes.
				</p>
				<hr className={s.divider} />
				<div className={s.messages} aria-live="polite">
					{renderMessage(isLoading, _response, referrer)}
				</div>
				<form
					action="#"
					onSubmit={(event) => {
						event && event.preventDefault();
						return actions.sendConsent();
					}}>
					<h2 className={s.form__title}>Use of my personal information for advertising purposes</h2>
					<div className={s.form__controls}>
						<RadioBtn value="true" checked={consent === true} onChange={actions.onConsentChange}>
							<strong>Allow</strong>
							<span>See personalised adverts</span>
						</RadioBtn>
						<RadioBtn value="false" checked={consent === false} onChange={actions.onConsentChange}>
							<strong>Block</strong>
							<span>Only see generic adverts</span>
						</RadioBtn>
					</div>
					<button className={s.form__submit} type="submit">
						Save
					</button>
				</form>
			</div>
		</div>
	);
}

const PrivacyManager = withCustomActions(BasePrivacyManager);

export { PrivacyManager };
