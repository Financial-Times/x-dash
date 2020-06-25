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

				// On response call any externally defined handlers following Node's convention:
				// 1. Either an error object or `null` as the first argument
				// 2. An object containing `consent` and `payload` as the second
				// Allows callbacks to decide how to handle a failure scenario

				if (res.ok === false) {
					throw new Error(res.statusText || String(res.status));
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
 * Display a warning to users
 * @param {string | undefined} userId
 */
function renderLoggedOutWarning(userId) {
	if (userId && userId.length > 0) return null;

	return (
		<p className={`${s.consent__copy} ${s['consent__copy--cta']}`}>
			Please{' '}
			<a href="https://www.ft.com/myaccount" data-trackable="Settings &amp; Account">
				sign into your account
			</a>{' '}
			before submitting your preferences to ensure these changes are applied across all of your
			devices
		</p>
	);
}

/**
 * @param {BasePrivacyManagerProps} Props
 */

export function BasePrivacyManager({
	userId,
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
					If you are a California resident, the California Consumer Privacy Act (CCPA) provides you
					with a right to opt out of the sale of your personal information. The definition of sale
					is extremely broad under the CCPA, and may include sharing certain pieces of information
					with our advertising partners, such as cookie identifiers, geolocation and interactions
					with advertisements, for the purposes of showing you advertising that is relevant to your
					interests. You can find more information about this in our{' '}
					<a href="https://help.ft.com/legal-privacy/privacy-policy/">Privacy Policy</a>, including
					other ways to opt out.
				</p>

				<p>
					You can choose to block sharing of this data with advertisers. This means that we turn off
					some types of advertising based on information you have given us and your use of our
					Sites, ensuring that our advertising partners do not receive this data. By opting out, you
					will stop receiving adverts that are targeted specifically to you; however, you will still
					see the same number of adverts on our Sites.
				</p>
				<hr className={s.divider} />
				{renderLoggedOutWarning(userId)}
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
					<div className={s.form__controls}>
						<RadioBtn
							value="true"
							trackingId="ccpa-advertising-toggle-allow"
							checked={consent === true}
							onChange={actions.onConsentChange}>
							<strong>Allow</strong>
							<span>See personalised adverts</span>
						</RadioBtn>
						<RadioBtn
							value="false"
							trackingId="ccpa-advertising-toggle-block"
							checked={consent === false}
							onChange={actions.onConsentChange}>
							<strong>Block</strong>
							<span>Opt out of personalised adverts</span>
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
