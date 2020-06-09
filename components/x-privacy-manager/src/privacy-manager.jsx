/// <reference path="./types.d.ts" />

import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';

import s from './privacy-manager.scss';
import { RadioBtn } from './radio-btn';
import { LoadingMessage, ResponseMessage } from './messages';

// CCPA legislation doesn't require to record the form-of-words used in the page,
// but our consent-proxy schemas do require the field. For that reason,
// it was decided to create a placeholder in our FOW database that would always use
// for CCPA page independently of the specific wording used in it.
// This is the value:
const FOW_NAME = 'privacyCCPA';
const FOW_VERSION = 'H0IeyQBalorD.6nTqqzhNTKECSgOPJCG';

export const withCustomActions = withActions(() => ({
	onConsentChange() {
		return ({ consent = true }) => ({ consent: !consent });
	},

	/**
	 * Save the users choice via the ConsentProxy
	 *
	 * @param {string} consentApiEnhancedUrl
	 * @param {OnSaveCallback[]} onConsentSavedCallbacks
	 * @param {string} consentSource (e.g. 'next-control-centre')
	 *
	 * @returns {(props: BasePrivacyManagerProps) => Promise<{_response: _Response}>}
	 */
	sendConsent(consentApiEnhancedUrl, onConsentSavedCallbacks, consentSource) {
		return async ({ isLoading, consent }) => {
			if (isLoading) return;

			const categoryPayload = {
				onsite: {
					status: consent,
					lbi: true,
					source: consentSource,
					fow: `${FOW_NAME}/${FOW_VERSION}`,
				},
			};

			const payload = {
				formOfWordsId: FOW_NAME,
				consentSource,
				data: {
					behaviouralAds: categoryPayload,
					demographicAds: categoryPayload,
					programmaticAds: categoryPayload,
				},
			};

			try {
				const res = await fetch(consentApiEnhancedUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(payload),
					credentials: 'include',
				});

				const json = await res.json();
				const error = (json.body && json.body.error) || null;

				// Call any externally defined handlers with the value of `payload`
				for (const fn of onConsentSavedCallbacks) {
					fn(error, { consent, payload });
				}

				// On response call any externally defined handlers following Node's convention:
				// 1. Either an error object or `null` as the first argument
				// 2. An object containing `consent` and `payload` as the second
				// Allows callbacks to decide how to handle a failure scenario

				if (res.ok === false) {
					throw new Error(res.statusText || res.status);
				}

				for (const fn of onConsentSavedCallbacks) {
					fn(null, { consent, payload });
				}

				return { _response: { ok: true } };
			} catch (err) {
				for (const fn of onConsentSavedCallbacks) {
					fn(err, { consent, payload });
				}

				return { _response: { ok: false } };
			}
		};
	},
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
 * @param {BasePrivacyManagerProps} Props
 */
export function BasePrivacyManager({
	consent = true,
	consentProxyEndpoints,
	consentSource,
	onConsentSavedCallbacks = [],
	referrer,
	actions,
	isLoading,
	_response = undefined,
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
					action={consentProxyEndpoints.createOrUpdateRecord}
					onSubmit={(event) => {
						event && event.preventDefault();
						return actions.sendConsent(
							consentProxyEndpoints.createOrUpdateRecord,
							onConsentSavedCallbacks,
							consentSource
						);
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
